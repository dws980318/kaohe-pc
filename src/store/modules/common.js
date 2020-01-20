import { api, request } from '../../ajax'

const state = {
    IssueList: [],
    DurationList: [],
    CourseList: []
};

const mutations = {
    setCreaAssessIssueList(state, param) {
        state.IssueList = param;
    },
    setcreaAssessDurationList(state, param) {
        state.DurationList = param
    },
    setcreaAssessCourseList(state, param) {
        state.CourseList = param
    }
};

const actions = {
    //请求考核题目列表数据
    async CreaAssessIssueListAction(context) {
        let result = await request.post(api.selectCreaAssessIssueList_API);
        // let result = {};
        // result.data = require("../../data/data.json");
        // console.log(result)
        let newData = result.data.data.map(item => {
            return {
                assessId: item.assessId,
                englishQuestion: item.englishQuestion,
                question: item.question,
                status: Boolean(Number(item.status)) ? "启用" : "禁用",
                id: item.id,
            }
        });
        console.log(newData)
        context.commit('setCreaAssessIssueList', newData);
    },

     //请求考核期列表数据
     async creaAssessDurationListAction(context) {
        let result = await request.post(api.list_API);
        // let result = {};
        // result.data = require("../../data/data.json");
        // console.log(result)
        let newData = result.data.data.map(item => {
            return {
                departmentid: item.departmentid,
                englishTitle: item.englishTitle,
                endTime: item.endTime,
                startTime: item.startTime,
                title: item.title,
                status: Boolean(Number(item.status)) ? "启用" : "禁用",
                id: item.id,
            }
        });
        console.log(newData)
        context.commit('setcreaAssessDurationList', newData);
    },

    //请求个人考核成绩列表数据
    async selectAssessCourseListAction(context) {
        let result = await request.post(api.selectAssessCourseList_API);
        // let result = {};
        // result.data = require("../../data/data.json");
        // console.log(result)
        let newData = result.data.data.map(item => {
            return {
                dTEnglishName: item.dTEnglishName,
                englishName: item.englishName,
                finishingRate: item.finishingRate,
                name: item.name,
                username: item.username,
                id: item.id,
            }
        });
        console.log(newData)
        context.commit('setcreaAssessCourseList', newData);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
