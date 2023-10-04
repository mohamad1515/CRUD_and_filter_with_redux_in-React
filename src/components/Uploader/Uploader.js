import Upload from "../../assets/img.png"
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { setImageCard } from 'src/redux/actions/PostActions';
import "./Uploader.css"

const Uploader = ({ image, setImage }) => {
    const dispatch = useDispatch()
    // let base64String = "";
    const handleChange = () => {

        var file = document.querySelector(
            'input[type=file]')['files'][0];
        var reader = new FileReader();

        reader.onload = function () {
            // base64String = 
            reader.result.replace("data:", "")
                .replace(/^.+,/, "");
            setImage(reader.result);
            dispatch(setImageCard(reader.result))

        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="userProfile">
            <div className="userImg">
                <img src={image ? image : Upload} id="dropdown-basic-button" alt="logox" />
                <div className="uploadBox">
                    <label className="uploadBtn">
                        <AiOutlinePlus className="adminIcon" />
                        <input accept="image/*" type="file" className="uploadINputfile" onChange={handleChange} />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Uploader