import React from "react";
import { useParams } from "react-router-dom";

export default function Clothing () {
    const { idMan } = useParams()
    return (
        <div className="mt-36">{idMan}</div>
    )
}