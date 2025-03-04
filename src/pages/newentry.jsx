import axios from "axios";
import react ,{useState} from "react"
import { useNavigate } from "react-router-dom";

const NewEntry = () => {
    const navigate = useNavigate();
    const [newEntry, setNewEntry] = useState({ donor: "", donated_date: "", blood_group: "", volume: "",expired_date:"" });

    const handleNewEntryChange = (event) => {
        const { name, value } = event.target;
        setNewEntry({ ...newEntry, [name]: value });
    };
    const handleSave =async(e)=>{
        console.log(newEntry)
        e.preventDefault()
        try {
            const response=await axios.post("http://localhost:8000/bloodstock/add-bloodstock",newEntry)
            if(response.status===201){
                console.log(response.data.message)
                navigate('/bloodstock')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="form-container">
            <h3>Add New Entry</h3>
            <input type="text" name="donor" placeholder="Donor Name" value={newEntry.donor} onChange={handleNewEntryChange} />
            <input type="date" name="donated_date" label="abcd" value={newEntry.donated_date} onChange={handleNewEntryChange} />
            <input type="date" name="expired_date" value={newEntry.expired_date} onChange={handleNewEntryChange} />
            <select name ="blood_group"  value={newEntry.blood_group} onChange={handleNewEntryChange}>
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
            </select>
            <input type="number" name="volume" placeholder="Volume (ml)" value={newEntry.volume} onChange={handleNewEntryChange} />
            <button onClick={handleSave} className="save-btn">Save</button>
            <button className="cancel-btn" onClick={() => navigate("/")}>Cancel</button>
        </div>
    );
};
export default  NewEntry;