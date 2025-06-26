import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRef, useState } from "react";

function Logout() {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div>
            <Toast ref={toast} />

            {/* Confirm Dialog */}
            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                message="Are you sure you want to logout?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={() => {
                    setVisible(false);
                    logOut();
                }}
                reject={() => setVisible(false)}
            />

            {/* Logout Button */}
            <div className="card flex justify-content-center">
                <button
                    className="btn btn-danger"
                    onClick={() => setVisible(true)}
                >
                    Logout <FaSignOutAlt />
                </button>
            </div>
        </div>
    );
}

export default Logout;
