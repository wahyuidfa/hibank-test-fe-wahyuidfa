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
import { Button } from "./ui/button";
import { DialogMain } from "./DialogMain";

export function TableMain({ data }) {
  return (
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
        {data.map(dt => (
          <TableRow key={dt.id}>
            <TableCell className='font-medium'>{dt.fullname}</TableCell>
            <TableCell>{dt.email}</TableCell>
            <TableCell>{dt.birthdate}</TableCell>
            <TableCell className=''>{dt.phone}</TableCell>
            <TableCell className=''>{dt.age}</TableCell>
            <TableCell className=''>
              <div className="flex gap-3 items-center">
               <Button>Edit</Button>|| <Button>Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
