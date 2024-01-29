import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePickerDemo from "./DatePicker";
import { useEffect, useState } from "react";

export function DialogMain({ users, setUsers }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [newUser, setNewUser] = useState({
    fullname: "",
    email: "",
    phone: "",
    age: "",
  });

  const calculateAge = birthdate => {
    const today = new Date();
    const birthDate = new Date(birthdate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleChange = event => {
    let value = event.target.value;
    let name = event.target.name;

    if (birthdate) {
      // Jika yang diubah adalah tanggal lahir, hitung dan set umur
      const calculatedAge = calculateAge(value);
      setNewUser(prevValue => {
        return {
          ...prevValue,
          [name]: value,
          age: calculatedAge,
        };
      });
    } else {
      // Jika yang diubah bukan tanggal lahir, set nilai seperti biasa
      setNewUser(prevValue => {
        return {
          ...prevValue,
          [name]: value,
        };
      });
    }
  };

  const handleAddUser = () => {
    // Menambahkan pengguna baru
    if (newUser.age && newUser.email && newUser.fullname && newUser.phone) {
      fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newUser, birthdate: birthdate }),
      })
        .then(response => response.json())
        .then(data => {
          setUsers([...users, data]);
          setNewUser({ fullname: "", email: "", phone: "", age: "" });
        });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Change user here</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='fulname' className='text-right'>
              Fullname
            </Label>
            <Input
              name='fullname'
              onChange={handleChange}
              id='fullname'
              defaultValue={""}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='email' className='text-right'>
              Email
            </Label>
            <Input
              id='email'
              name='email'
              onChange={handleChange}
              defaultValue={""}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='birthdate' className='text-right'>
              Birth Date
            </Label>
            <DatePickerDemo date={birthdate} setDate={setBirthdate} />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='phone' className='text-right'>
              Phone
            </Label>
            <Input
              id='phone'
              name='phone'
              onChange={handleChange}
              defaultValue={""}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='age' className='text-right'>
              Age
            </Label>
            <Input
              name='age'
              id='age'
              onChange={handleChange}
              defaultValue={newUser.age}
              className='col-span-3'
              value={newUser.age}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddUser} type='submit'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
