import React, { useEffect, useState } from 'react';
///firebase
import db from "../firebase";
import firebase from "../firebase";
import { collection, getDocs} from "firebase/firestore";
import {doc, onSnapshot} from "firebase/firestore";
import * as IPFS from 'ipfs-core';



function File_view() {

    ///firebase cloud
    const [posts, SetPosts] = useState([])

    useEffect(() => {
        //データベースよりデータを取得
        const postData = collection(db, "posts")
        getDocs(postData).then((snapShot) => {
            SetPosts(snapShot.docs.map((doc) => ({...doc.data() })))
        });
        //リアルタイム処理
        onSnapshot(postData, (post) => {
            SetPosts(post.docs.map((doc) => ({...doc.data()})))
        });
    },[]);

    const ipfs_views =  async () => {
        const ipfs = await IPFS.create();
        for (let i=0; i<posts.length; i++){
            let hash = posts[i].text
            let stream = ipfs.cat(hash)
            const decoder = new TextDecoder()
            let data = ''
            for await (const chunk of stream) {
                data += decoder.decode(chunk, { stream: true })
                let ipfs_textaria = document.getElementById('ipfs_text');
                let ipfs_cntents = document.createElement('div')
                let ipfs_hash = document.createElement('div')
                    //テキストの表示
                    ipfs_cntents.className = 'ipfs_cntents';
                    ipfs_textaria.appendChild(ipfs_cntents);
                    //hashの表示
                    ipfs_hash.className='hash_contents';
                    ipfs_textaria.appendChild(ipfs_hash);

                    //HTMLに追加
                    ipfs_cntents.innerHTML = data;
                    ipfs_hash.innerHTML = hash;
          }
        }
    }
    return (
        <>
            <button onClick={ipfs_views}>おせ</button>
            <p id="ipfs_text"></p>
        </>
    )
}
export default File_view;