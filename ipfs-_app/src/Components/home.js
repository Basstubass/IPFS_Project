import React, { useState } from 'react';
import axios from 'axios'


function Home() {

    const [data, setData] = React.useState();
	const [text, setText] = useState("");

	const url = "http://127.0.0.1:8000/";

	const GetData = () => {
		axios.get(url).then((res) => {
			setData(res.data);
		});
    };


	const ChangeText = (e) => {
		setText(e.target.value);
		
	  }

	const clickSubmit = () => {
		axios.post(url+"hello/", {
		  // axiosならJSONデータをリテラルで書ける
		  post_text: text
		}).then(function(res) {
			alert(res.data.test);
			console.log(res.data)
		  })
	};



    return (
        <>
            <div>
			<div>ここに処理を書いていきます</div>
			{data ? <div>{data.Hello}</div> : <button onClick={GetData}>データを取得</button>}
		</div>

			<label htmlFor="name">Name: </label>
			<br/>
			<input type="text" id="name" name="name" value={text} onChange={ChangeText}/>
			{/* <input type="text" id="name" name="name" value={text}/> */}
			<br/>
			{/* <input type="submit" defaultValue={"Submit"}/> */}
			<button type="submit" onClick={clickSubmit}> 送信</button>

		<p>{text}</p>
        </>
    )
}
export default Home;