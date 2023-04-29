import "./Uploader.css"
import Upload from "../../assets/img.jpg"
import { AiOutlinePlus } from "react-icons/ai";


const Uploader = ({ img, setImg }) => {

    return (
        <div className="userProfile">
            <div className="userImg">
                <img src={img ? img : Upload} id="dropdown-basic-button" alt="logox" />
                <div className="uploadBox">
                    <label className="uploadBtn">
                        <AiOutlinePlus className="adminIcon" />
                        <input type="file" className="uploadINputfile" onChange={setImg} />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Uploader