import react ,{useState} from "react"
import { useNavigate } from "react-router-dom";
const NewEntry = () => {
    const navigate = useNavigate();
    const [newEntry, setNewEntry] = useState({ donor: "", date: "", bloodGroup: "", volume: "" });

    const handleNewEntryChange = (event) => {
        const { name, value } = event.target;
        setNewEntry({ ...newEntry, [name]: value });
    };

    return (
        <div className="form-container">
            <h3>Add New Entry</h3>
            <input type="text" name="donor" placeholder="Donor Name" value={newEntry.donor} onChange={handleNewEntryChange} />
            <input type="date" name="date" value={newEntry.date} onChange={handleNewEntryChange} />
            <select name ="bloodGroup" className="input " value={newEntry.bloodGroup} onChange={handleNewEntryChange}>
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
            <button className="save-btn">Save</button>
            <button className="cancel-btn" onClick={() => navigate("/")}>Cancel</button>
        </div>
    );
};
export default  NewEntry;