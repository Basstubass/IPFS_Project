import React, { Component, useEffect, useState } from "react";
// import { create } from 'ipfs-http-client';
import { Segment, Form, Input, Button, Message } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import db from "../firebase";
import firebase from "../firebase";
import 'firebase/firestore';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import * as IPFS from 'ipfs-core';
  const Buffer = require('buffer').Buffer;

  const Fileup_loader = () => {

  //   const [request, setRequest] = useState({});
  const [inputText, setText] = useState('');
  //   const [file, setFile] = useState({});
  const [img, setImg] = useState('');
  ///投稿
//   const [hash, setHash] = useState('');
  //firebaseに投稿
  const { register, Submit_post, errors } = useForm();
  // Create
  const [pending,setPending] = useState(false);
//   const createdAt = firebase.firestore.FieldValue.serverTimestamp();

  const handleSubmit =  async (event) => {
    event.preventDefault();
    const ipfs = await IPFS.create();
    try {
      const file =  await ipfs.add(img)
      const stream = ipfs.cat(file.path)
      const decoder = new TextDecoder()
      let data = ''
        for await (const chunk of stream) {
        data += decoder.decode(chunk, { stream: true })
        }
        console.log(data)
        console.log(file.path)
      ///catの追加
       return document.getElementById("1").innerHTML = "IPFS hash:" + file.path;
     }
     catch (e) {
      console.error(e)
    }
  }
  const text_handleSubmit = async (event) => {
    event.preventDefault();
    const ipfs = await IPFS.create();
    try {
      const file =  await ipfs.add(inputText)
      const stream = ipfs.cat(file.path)
      const decoder = new TextDecoder()
      let data = ''
        for await (const chunk of stream) {
        data += decoder.decode(chunk, { stream: true })
        }
        console.log(data)
        console.log(file.path)

      document.getElementById("1").innerHTML = "IPFS hash:" + file.path;
      OnSubmit(file)


      let link = document.getElementById('Link');
      link.innerHTML = '<a id="link" href=https://ipfs.io/ipfs/' + file.path + '>アップロードしたテキスト</a>';
     }
     catch (e) {
      console.error(e)
    }
  }
  const captureFile = async(event) => {
    event.stopPropagation()
    event.preventDefault()
    console.log(event)
    const files = event.target.files
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(files[0]);
        reader.onloadend = () => {
            const res = reader.result;
            setImg(Buffer.from(res));
            console.log(reader.result);
          };
    };
    const handleChange = (event) => {
        setText(event.target.value);
      };


    //firebaseに保存
    const OnSubmit = async (file) => {
        setPending(true);
        try {
            await addDoc(collection(db,'posts'),{
                text: file.path
            });
        }
        finally {
            setPending(false);
        }
    }


  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <p>ファイルをアップロード</p>
                <Input type="file" onChange={captureFile}></Input>
            </Form.Field>
            <Button>Submit</Button>
        </Form>

        <Form onSubmit={text_handleSubmit}>
            <Form.Field>
                <p>テキストのアップロード</p>
                <Input  placeholder="Input data"
                    value={inputText} onChange={handleChange}></Input>
            </Form.Field>
            <Button>Submit</Button>
        </Form>
      <div>
        <p id="1"></p>
        <div id="Link">
           
        </div>
      </div>
    </div>
  )
}

export default Fileup_loader;