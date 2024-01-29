import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { UploadIcon } from "lucide-react";
import Link from "next/link";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sidebar } from "@/components/Sidebar";
import { TableMain } from "@/components/Table";
import { DialogMain } from "@/components/DialogMain";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { convertToCSV } from "@/utils/convertCSV";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { token } = useAuth();
  // const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    fullname: "",
    email: "",
    birthdate: "",
    phone: "",
  });
  const [editUser, setEditUser] = useState({
    id: "",
    fullname: "",
    email: "",
    birthdate: "",
    phone: "",
    age: "",
  });
  const [edit, setEdit] = useState(false);

  const handleChange = event => {
    let value = event.target.value;
    let name = event.target.name;

    setEditUser(prevalue => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };

  useEffect(() => {
    const getData = () => {
      axios
        .get("/api/users")
        .then(res => {
          console.log(res.data);
          setUsers(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getData();
  }, []);

  const handleAddUser = () => {
    // Menambahkan pengguna baru
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        setUsers([...users, data]);
        setNewUser({ fullname: "", email: "", birthdate: "", phone: "" });
      });
  };

  const handleEditUser = id => {
    // Mengedit pengguna
    setEdit(true);
    setEditUser(prev => {
      return {
        ...prev,
        id: id,
      };
    });
    if (
      editUser.age &&
      editUser.birthdate &&
      editUser.age &&
      editUser.email &&
      editUser.fullname
    )
      fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editUser.id, updatedUser: editUser }),
      })
        .then(response => response.json())
        .then(data => {
          const updatedUsers = users.map(user =>
            user.id === editUser.id ? data : user
          );
          setUsers(updatedUsers);
          setEditUser({ fullname: "", email: "", birthdate: "", phone: "" });
        });
  };

  const handleDeleteUser = id => {
    // Menghapus pengguna
    fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then(response => response.json())
      .then(data => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
      });
  };

  const saveEditedUser = id => {
    if (
      editUser.age &&
      editUser.birthdate &&
      editUser.age &&
      editUser.email &&
      editUser.fullname
    )
      fetch(`/api/users/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editUser.id, updatedUser: editUser }),
      })
        .then(response => response.json())
        .then(data => {
          console.log("====================================");
          console.log(data);
          console.log("====================================");
          const updatedUsers = users.map(user =>
            user.id === editUser.id ? data : user
          );
          setUsers(updatedUsers);
          setEditUser({
            id: "",
            fullname: "",
            email: "",
            birthdate: "",
            phone: "",
          });
        });
  };

  const handleDownloadCSV = () => {
    const csvData = convertToCSV(users);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <main
      onClick={() =>
        setEditUser(prev => {
          return {
            ...prev,
            id: "",
          };
        })
      }
      className={` min-h-screen w-full p-10 md:p-20 ${inter.className}`}>
      <Navbar />

      <div className='mt-10'>
        <ResizablePanelGroup
          direction='horizontal'
          className='min-h-max max-w-full rounded-lg border'>
          <ResizablePanel defaultSize={25}>
            <div className='flex h-full items-center justify-center p-6'>
              <Sidebar />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className='p-6 flex justify-between'>
              <div className='flex gap-3'>
                <DialogMain users={users} setUsers={setUsers} />
                <Button>
                  <UploadIcon width='24' height='24' /> Upload
                </Button>
              </div>
              <Button onClick={handleDownloadCSV}>Download</Button>
            </div>
            <div
              className='flex h-full justify-center p-6 '
              onClick={e => {
                // do not close modal if anything inside modal content is clicked
                e.stopPropagation();
              }}>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fullname</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Birth Date</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(dt => (
                    <TableRow key={dt.id}>
                      <TableCell className='font-medium'>
                        {editUser.id === dt.id ? (
                          <Input name='fullname' onChange={handleChange} />
                        ) : (
                          dt.fullname
                        )}
                      </TableCell>
                      <TableCell>
                        {editUser.id === dt.id ? (
                          <Input name='email' onChange={handleChange} />
                        ) : (
                          dt.email
                        )}
                      </TableCell>
                      <TableCell>
                        {editUser.id === dt.id ? (
                          <Input name='birthdate' onChange={handleChange} />
                        ) : (
                          dt.birthdate
                        )}
                      </TableCell>
                      <TableCell className=''>
                        {editUser.id === dt.id ? (
                          <Input name='phone' onChange={handleChange} />
                        ) : (
                          dt.phone
                        )}
                      </TableCell>
                      <TableCell className=''>
                        {editUser.id === dt.id ? (
                          <Input name='age' onChange={handleChange} />
                        ) : (
                          dt.age
                        )}
                      </TableCell>
                      <TableCell className=''>
                        <div className='flex gap-3 items-center'>
                          {editUser.id === dt.id ? (
                            <Button onClick={() => saveEditedUser()}>
                              Save
                            </Button>
                          ) : (
                            <Button onClick={() => handleEditUser(dt.id)}>
                              Edit
                            </Button>
                          )}
                          ||{" "}
                          <Button onClick={() => handleDeleteUser(dt.id)}>
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
