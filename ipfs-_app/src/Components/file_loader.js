import React, { Component, useEffect, useState } from "react";
// import { create } from 'ipfs-http-client';
import { Segment, Form, Input, Button, Message } from 'semantic-ui-react';
import * as IPFS from 'ipfs-core';
const Buffer = require('buffer').Buffer;

const Fileup_loader = () => {

//   const [request, setRequest] = useState({});
//   const [file, setFile] = useState({});
  const [img, setImg] = useState('');

  const handleSubmit =  async (event) => {
    event.preventDefault();
    const ipfs = await IPFS.create();
    try {
      const file =  await ipfs.add(img)
      await ipfs.stop()
      myChangeHandler(file)
       return document.getElementById("1").innerHTML = "IPFS hash:" + file.path;
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

  const myChangeHandler = async(event) => {
    const node = await IPFS.create()
    console.log(event.path)
  };

  return (
    <div>

    <Form onSubmit={handleSubmit}>
        <Form.Field>
            <Input type="file" onChange={captureFile}></Input>
        </Form.Field>
        <Button>Submit</Button>
    </Form>


      


      <div>
        <p id="1"></p>
        <div className="img_aria">
        {/* <a href={`https://ipfs.io/ipfs/${file.path}`}>リンク</a> */}
        </div>
      </div>



    </div>
  )
}

export default Fileup_loader;