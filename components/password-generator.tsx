"use client";
import { useState, ChangeEvent } from "react";
import { Card,CardHeader,CardTitle,CardDescription,CardContent,CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

export default function GeneratePasswordComponents(){
    const [length, setLength]=useState<number>(16);
    const [includeuppercase, setInculdeUpperCase]=useState<boolean>(true);
    const [includelowercase, setIncludeLowerCase]=useState<boolean>(true);
    const [includenumbers, setIncludeNumbers]=useState<boolean>(true);
    const [includesymbols, setIncludeSymbols]=useState<boolean>(true);
    const [password, setPassword]=useState<string>("");

    const handleLengthChange =(e: ChangeEvent<HTMLInputElement>):void=>{
        setLength(Number(e.target.value));
    };
    const generatePassword=():void=>{
        const upperCaseChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerCaseChars="abcdefghijklmnopqrstuvwxyz";
        const numberChars="0123456789";
        const symbolChars="!@#$%^&*()_+[]{}|;:,.<>?";

        let allChars="";
        if(includeuppercase) allChars += upperCaseChars;
        if(includelowercase) allChars += lowerCaseChars;
        if(includenumbers) allChars += numberChars;
        if(includesymbols) allChars += symbolChars;

        if(allChars === ""){
            alert("Please select atleast one character type.");
            return;
        }
        let generatePassword="";
        for(let i=0 ; i<length; i++){
            const randomIndex=Math.floor(Math.random()*allChars.length);
            generatePassword += allChars[randomIndex];
        }
        setPassword(generatePassword);
};
   const copyToClipboard=() :void =>{
    navigator.clipboard.writeText(password).then(
        ()=>{
            alert("Password Copy To Clipboard!");
        },
        (err)=>{
            alert("Failed To Copy Password To Clipboard");
        }
    );
   };
   const hadleCheckboxChange=
   (setter:(value:boolean) =>void)=>
   (checked:CheckedState):void =>{
    if(typeof checked === "boolean"){
        setter(checked)
    }
   };
   return(
    <div className="flex flex-col items-center justify-center mini-h-screen bg-gray-100 dark:bg-gray-800">
        <Card className="w-md max-w-md p-6 bg-purple-300 dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="max-auto max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Password Generator</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Create a secure password with just a few clicks.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="length">Password Length</Label>
                        <Input
                        id="length"
                        type="number"
                        min="8"
                        max="32"
                        value={length}
                        onChange={handleLengthChange}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                        <Label>Include:</Label>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                            id="uppercase"
                            checked={includeuppercase}
                            onCheckedChange={hadleCheckboxChange(setInculdeUpperCase)}
                            />
                            <Label htmlFor="uppercase">Uppercase Letters</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                            id="lowercase"
                            checked={includelowercase}
                            onCheckedChange={hadleCheckboxChange(setIncludeLowerCase)}
                            />

                            <Label htmlFor="lowercase">Lowercase Letters</Label>
                       </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox
                        id="number"
                        checked={includenumbers}
                        onCheckedChange={hadleCheckboxChange(setIncludeNumbers)}
                        />
                        <Label htmlFor="numbers">Number</Label>
                       </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox
                        id="symbol"
                        checked={includesymbols}
                        onCheckedChange={hadleCheckboxChange(setIncludeSymbols)}
                        />
                        <Label htmlFor="symbols">Symbols</Label>
                       </div>
                    </div>
                    <Button type="button" className="w-full" onClick={generatePassword}>
                        Generate Password
                    </Button>
                    <div className="space-y-2">
                        <Label htmlFor="password">Generated Password</Label>
                        <div className="flex items-center space-x-2">
                            <Input
                            id="password"
                            type="text"
                            value={password}
                            readOnly
                            className="flex-1"
                            />
                            <Button type="button" onClick={copyToClipboard}>
                                Copy To Clipboard
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>
   )
}