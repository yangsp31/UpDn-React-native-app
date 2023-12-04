import React from 'react'

export async function RequestRealtimeData() {
    try {
        const response = await fetch('http://192.168.55.136:8080/UpDn/SP/Request/Flask');

        if(response.ok) {
            const data = await response.json();
            console.log("OK");
            return data;
        }
        else {
            return null;
        }
    } catch (e) {
        console.log(e);

        return null;
    }
}

export async function RepuestGpt(keyWord) {
    try {
        const response = await fetch('http://192.168.55.136:8080/UpDn/SP/Request/Gpt?keyWord=' + keyWord);

        if(response.ok) {
            const data = await response.json();

            if(data.result != null) {
                return data;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    } catch (e) {
        console.log(e);

        return null;
    }
}