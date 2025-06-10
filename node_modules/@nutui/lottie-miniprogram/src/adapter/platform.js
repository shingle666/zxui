export default function getHost() {
    let host = {
        request: () => {
        },
        getSystemInfoSync: () => {
            return {}
        }
    }
    if (typeof wx !== 'undefined') {
        host = wx
    }
    if (typeof jd !== 'undefined') {
        host = jd
    }
    return host
}
