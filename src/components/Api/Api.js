import * as axios from "axios";

const charnikInstance = axios.create({
    baseURL: "https://free111625.ispsite.ru/",
});

export const personAPI = {

    getCards() {
        return charnikInstance.get('charniki',
            {
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            }
        );
    },
    getPerson(url) {
        return charnikInstance.get(url,
            {
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            }
        );
    },
    setCurrentHP(data) {
        return charnikInstance.post("api/",
            {
                data: data
            }
        );
    },
    setNewAvatar(personID, image) {
        let formData = new FormData;
        formData.append('personID', personID);
        formData.append("Avatar", image);
        return charnikInstance.post("api/setnewavatar",formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    },
    setPresetCube(personID, presetCube) {
        return charnikInstance.post("api/preset",
            {
                personID: personID,
                presetCube: presetCube
            }
        );
    },
    deletePresetCube(personID, presetCubeId) {
        return charnikInstance.post("api/preset-delete",
            {
                personID: personID,
                presetCubeId: presetCubeId
            }
        );
    },
    getPreset(personID) {
        return charnikInstance.get("api/preset-get?id=" + personID);
    },
    savePersonData(personData) {
        return charnikInstance.post("api/save-person-data",
            {
                data: personData
            }
        );
    },
    setTextContent(personID, textContent) {
        return charnikInstance.post("api/textcontent-post",
            {
                personID: personID,
                textContent: textContent
            }
        );
    },
    setConsumedSlots(spellSlotID, slotsId, isConsumed, personID) {
        return charnikInstance.post("api/set-spell-slots-post",
            {
                personID: personID,
                isConsumed: isConsumed,
                spellSlotID: spellSlotID,
                slotsId: slotsId
            }
        );
    }
}


export const pushAPI = {
    sendPushFirebase(personID, text) {
        return charnikInstance.post("api/send-push-to-admin", {
            personID: personID,
            pushBody: text
        })
    }
}