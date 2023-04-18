export const api = async (url, options) => {
    let result = { ok: false, data: null, message: "" }
    try {
        const response = options ? await fetch(url, options) : await fetch(url);
        if (response.ok) {
            result.ok = true
            result.data = await response.json()
        }
        else {
            result.message = response.statusText
        }
    } catch (err) {
        result.ok = false
        result.message = err.messageText
    }
    return result;
}
