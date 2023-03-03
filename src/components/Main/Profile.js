import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export default function Profile () {
    const {
        currentUser,
        det, setDet
    } = useAuth()
    const [infoChange, setInfoChange] = useState(false)
    const [preDet, setPreDet] = useState({
        info:det.info,
        tel:det.tel,
        email:det.email,
    })

    const changeInfo = () => {
        setInfoChange(true)
    }
    const saveInfo = () => {
        setDet({
            info:preDet.info,
            tel:preDet.tel,
            email:preDet.email
        });
        setInfoChange(false);
    }
    const backInfo = () => {
        setPreDet({
            info:det.info,
            tel:det.tel,
            email:det.email
        })
        setInfoChange(false);
    }
    
    return (
        <div className="prof">
            <div className="prof-left"></div>
            {currentUser ? (
                <div className="prof-center">
                {!infoChange && det ? (
                <>
                <div className="prof-photo prof-photo-save"></div>
                <div className="prof-txt">Email: {currentUser.email}</div>
                <div className="prof-txt">Detali cont:</div>
                <div className="prof-det">
                    <div className="prof-txt">Informatii adresa:<br />
                        <div className="prof-det-txt">{det.info !== '' ? det.info : 'Adresa nesetata'}</div>
                    </div>
                    <div className="prof-txt">Numar de telefon:<br />
                        <div className="prof-det-txt">{det.tel !== '' ? det.tel : 'Numar de telefon nesetat'}</div>
                    </div>
                    <div className="prof-txt">Email de contact:<br />
                        <div className="prof-det-txt">{det.email !== '' ? det.email : `Emailul default: ${currentUser.email}`}</div>
                    </div>
                    <div className="prof-save" onClick={changeInfo}>Editeaza</div>
                </div>
                </> 
                ) : (
                <>
                <div className="prof-photo prof-photo-edit"></div>
                <div className="prof-txt">Email: {currentUser.email}</div>
                <div className="prof-txt">Detali cont:</div>
                <div className="prof-det">
                    <div className="prof-txt">
                        Informatii adresa:
                        <input type='text' value={preDet.info}
                        onChange={e => setPreDet({ ...preDet, info: e.target.value})}
                        className='prof-input' required
                        />
                    </div>
                    <div className="prof-txt">
                        Numar de telefon:
                        <input type='number' value={preDet.tel}
                        onChange={e => setPreDet({ ...preDet, tel: e.target.value})}
                        className='prof-input' required
                        />
                    </div>
                    <div className="prof-txt">
                        Email de contact:
                        <input type='email' value={preDet.email}
                        onChange={e => setPreDet({ ...preDet, email: e.target.value})}
                        className='prof-input' required
                        />
                    </div>
                    <div className="prof-btn-flex">
                        <div className="prof-save" onClick={saveInfo}>Salveaza</div>
                        <div className="prof-back" onClick={backInfo}>Inapoi</div>
                    </div>
                </div>
                    </>
                )}
            </div>
            ) : (<div className="prof-center">Nu esti conectat</div>)}
            <div className="prof-right"></div>
        </div>
    )
}