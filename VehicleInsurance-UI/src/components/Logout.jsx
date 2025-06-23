import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useRef, useState } from "react";

function Logout() {

    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    let navigate = useNavigate();
    const logOut = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div>

            <Toast ref={toast} />
            <ConfirmDialog group="declarative" visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
            <div className="card flex justify-content-center">

                <button className="btn btn-danger" onClick={() => { logOut(); setVisible(true) }} label="Confirm" >Logout <FaSignOutAlt /></button>
            </div>
        </div>

    )
}

export default Logout;