export const getFirestoreMessages = (state) => {
    let messages =  state.firestore.ordered.messages;
    console.log(state);
    if (messages) {
        let newMessages = messages.map((message) => {
            return {
                id: message.messageId,
                personId: message.personId,
                personName: message.personName,
                text: message.text,
                result: message.result,
                cubeValues: JSON.parse("[" + message.cubeValues + "]"),
                statCategory: message.statCategory,
                statName: message.statName,
            }
        });
        return newMessages;
    } else {
        return []
    }

}