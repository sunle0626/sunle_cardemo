import axios from 'axios';
export function getdata() {
    return fetch('https://baojia.chelun.com/v2-car-getMasterBrandList.html')
}
export async function getselectdata(url) {
    let data = [];
    await axios.get(url).then(res => {
        data = res.data.data;
    })
    return data;
}
export async function getdetails(url) {
    let data = [];
    await axios.get(url).then(res => {
        data = res.data.data;
    })
    return data;
}
export async function getimgs(url) {
    let data = [];
    await axios.get(url).then(res => {
        data = res.data.data;
    })
    return data;
}
export async function getdetailimgs(url) {
    let data = [];
    await axios.get(url).then(res => {
        data = res.data;
    });
    return data;
}
export async function getcolor(url) {
    let data = [];
    await axios.get(url).then(res => {
        data = res.data;
    });
    return data;
}