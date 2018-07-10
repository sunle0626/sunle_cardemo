import { getdata } from '../../mock/index'
const state = {
    List: [],
    letterlist: []
}

const mutations = {
    updategetList: (state, payload) => {
        state.List = payload;
    },
    updateLetter: (state, payload) => {
        state.letterlist = payload;
    }
}

const actions = {
    getdatas: ({ commit }, payload) => {
        getdata().then(res => {
            res.json().then(body => {
                if (body.code === 1) {
                    let data = {};
                    let datas = body.data;
                    let codearr = [];
                    datas.map(function (v) {
                        let code = v.Spelling.slice(0, 1);
                        if (!codearr.includes(code)) {
                            codearr.push(code);
                        }
                    })
                    let arr = [];
                    codearr.map(function (c, i) {
                        let ndata = {
                            id: i,
                            code: c,
                            list: []
                        };
                        datas.map(function (v) {
                            if (v.Spelling.startsWith(c)) {
                                ndata.list.push(v)
                            }
                        });
                        arr.push(ndata);
                    });
                    data = {
                        arr,
                        codearr
                    }
                    console.log(payload)
                    commit('updategetList', { ...data.arr });
                    commit('updateLetter', { ...data.codearr });
                } else {
                    alert(body.msg)
                }

            })
        })
    }
}

export default {
    state,
    actions,
    mutations
}