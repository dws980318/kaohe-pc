// 开发环境
const DEV_HOST = 'http://localhost:8080'
// 测试环境
const SET_HOST = 'http://192.168.0.120:9095'
// 生产环境
const PRO_HOST = 'http://193.112.173.69:9095'



export default {
    HOST: SET_HOST,
    selectCreaDepartmentList_API,
    selectCreaAdminList_API,
    selectCreaUserList_API,
    selectCreaAssessList_API,
    selectCreaAssessIssueList_API,
    list_API,
    selectAssessCourseList_API
}



/*
说明： 部门列表数据
请求方式：POST
参数： name
*/
const selectCreaDepartmentList_API = '/hotel/creaDepartment/selectCreaDepartmentList'



/* 
说明： 管理员信息列表数据
请求方式： POST
参数：name  loginname
*/
const selectCreaAdminList_API = '/hotel/creaAdmin/selectCreaAdminList'


/* 
说明： 员工信息列表数据
请求方式： POST
参数：name  loginname
*/
const selectCreaUserList_API = '/hotel/creaUser/selectCreaUserList'



/* 
说明： 考核标准信息列表数据
请求方式： POST
参数：name  loginname
*/
const selectCreaAssessList_API = '/hotel/creaAssess/selectCreaAssessList'


/* 
说明： 考核题目信息列表数据
请求方式： POST
参数：name  loginname
*/
const selectCreaAssessIssueList_API = '/hotel/creaAssessIssue/selectCreaAssessIssueList'


/* 
说明： 考核期信息列表数据
请求方式： POST
参数：name  loginname
*/
const list_API = '/hotel/creaAssessDuration/list'


/* 
说明： 考核期信息列表数据
请求方式： POST
参数：name  loginname
*/
const selectAssessCourseList_API = '/hotel/creaAssessCourse/selectAssessCourseList'