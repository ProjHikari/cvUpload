import React from 'react';
import axios from 'axios';
import { format } from "date-fns";

class Upload extends React.Component<any, any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            name: null,
            file: null
        }
    }

    nameHandler = (event:any) => {
        this.setState({
            name: event.target.value
        })
    }

    fileHandler = (event:any) => {
        this.setState({
            file: event.target.files[0]
        })
    }

    send = () => {
        var date = new Date();
        var formattedDate = format(date, "MM-yyyy");
        console.log(formattedDate);
        const data = new FormData()
        data.append('name', 'cv' )
        data.append('candidate',this.state.name)
        data.append('role',"Hero")
        data.append('exp',"8-years")
        data.append("date",formattedDate)
        data.append('file', this.state.file)
        axios.post("http://localhost:8000/upload", data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res)
            })
    }

    render() {
        return (
            <div>
                <div>
                    <label>Name</label>
                    <input type="text" onChange={this.nameHandler} />
                </div>
                <div>
                    <label>File</label>
                    <input type="file" onChange={this.fileHandler} />
                </div>
                <button onClick={this.send}>Upload</button>
            </div>
        );
    }
}

export default Upload;