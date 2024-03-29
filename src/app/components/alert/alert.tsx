"use client";
import React, { useEffect, useRef, useCallback } from 'react';
import ErrorAlertBox from "./error";
import InfoAlertBox from "./info";
import SuccessAlertBox from "./success";
import WarningAlertBox from "./warn";

export type AlertType = {
    status: "info" | "warn" | "success" | "error";
    message: string;
    onClose: () => void;
};

export default function AlertBox(props: AlertType) {
    const { status, message, onClose } = props;
    const alertBoxRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (alertBoxRef.current && !alertBoxRef.current.contains(event.target as Node)) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div ref={alertBoxRef}>
        {status === "info" && <InfoAlertBox message={message} />}
        {status === "warn" && <WarningAlertBox message={message} />}
        {status === "success" && <SuccessAlertBox message={message} />}
        {status === "error" && <ErrorAlertBox message={message} />}
    </div>
    );
}