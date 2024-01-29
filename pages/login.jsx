// pages/login.js
import { useEffect, useState } from "react";
import axios from "axios";
import { InputText } from "@/components/InputText";
import { IconEye, IconEyeoff, IconProfil, IconPassword } from "@/icons";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Modal from "@/components/Modal";
import { Spinner } from "@/assets/spinner";
import lockedImg from "@/assets/LockedImg.png";
import unlockedImg from "@/assets/UnlockedImg.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({
    success: false,
    failure: false,
    isLoading: false,
  });
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async e => {
    setValidation(prev => {
      return {
        ...prev,
        isLoading: true,
      };
    });
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { username, password });
      const { token } = response.data;
      login(token);

      localStorage.setItem("accessToken", token);
      setTimeout(() => {
        setValidation(prev => {
          return {
            ...prev,
            isLoading: false,
            success: true,
          };
        });
        router.push("/");
      }, 4000);
    } catch (error) {
      setTimeout(() => {
        setValidation(prev => {
          return {
            ...prev,
            isLoading: false,
            failure: true,
          };
        });
      }, 4000);
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <Modal
        shown={validation.failure}
        close={() =>
          setValidation(prev => {
            return {
              ...prev,
              failure: false,
            };
          })
        }
        draggable={false}
        transparent={false}>
        <div className='flex flex-col items-center justify-center w-96 p-2 font-montserrat'>
          <Image
            src={lockedImg}
            width={100}
            height={100}
            alt='cross'
            priority={true}
          />
          <p className='text-black text-2xl'>Login Gagal</p>
          <p className='text-center'>
            Pastikan Username dan Password yang Anda masukan sudah benar
          </p>
        </div>
      </Modal>
      <Modal
        shown={validation.success}
        close={() => null}
        draggable={false}
        transparent={false}>
        <div className='flex flex-col items-center justify-center w-96 p-2 font-montserrat'>
          <Image
            src={unlockedImg}
            width={100}
            height={100}
            alt='cross'
            priority={true}
          />
          <p className='text-black text-2xl'>Login Berhasil</p>
          <p className='text-center'>Selamat Datang, </p>
        </div>
      </Modal>
      <div className=' font-montserrat flex items-center  w-full h-screen justify-center'>
        {/* Box Login */}
        <div className='w-full max-w-sm md:max-w-lg '>
          {/* Form Login */}
          <Card className=''>
            <CardHeader>
              <CardTitle>
                <span className='font-bold text-purple-600'>Logoka</span>
              </CardTitle>
              <CardDescription>
                Login untuk melihat lebih banyak
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className='p-4 w-4/5 m-auto'>
                <div className='ggrid w-full items-center gap-4'>
                  <div className='flex flex-col space-y-1 my-2'>
                    <Label htmlFor='text'>Username</Label>
                    <Input
                      id='text'
                      placeholder='jhonidoe'
                      type='text'
                      autoCapitalize='none'
                      autoComplete='email'
                      autoCorrect='off'
                      disabled={validation.isLoading}
                      required
                      onChange={e => setUsername(e.target.value)}
                    />
                  </div>
                  <Label htmlFor='password'>Password</Label>
                  <div className='flex flex-col space-y-1'>
                    <Input
                      id='password'
                      placeholder='********'
                      type='password'
                      autoCapitalize='none'
                      autoComplete='password'
                      autoCorrect='on'
                      disabled={validation.isLoading}
                      required
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    className={"my-2 w-full"}
                    disabled={validation.isLoading}>
                    {validation.isLoading ? <Spinner /> : "Log In"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <p>
                New to Logoka?{" "}
                <span className='text-purple-600'>Register please</span>{" "}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
