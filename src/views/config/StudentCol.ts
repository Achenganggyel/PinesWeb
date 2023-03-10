export const TeacherCol = {
    cols: [{
        width: '100',  // 宽度
        prop: 'id',  // prop接收数据
        label: '学号', // label名
        dict: 'id'  //  匹配是哪一个字典
      },
      {
        width: '200',
        type: 'input',
        prop: 'name',
        label: '姓名',
        dict:'name'
      },{
        width: '50',
        type: 'select',
        prop: 'gender',
        label: '性别',
        dict:'gender'
      },
      {
        width: '150',
        type: 'select',
        prop: 'college',
        label: '学院',
        dict: 'college'
      },
      {
        width: '200',
        type: 'select',
        prop: 'department',
        label: '系',
        dict: 'department'
      },
      {
        width:'200',
        type:'select',
        prop:'major',
        label:'专业',
        dict:'major'
      },{
        width:'150',
        type:'select',
        prop:'birth',
        label:'生日',
        dict:'birth'
      },
      {
        width: '40',
        type: 'select',
        prop: 'status_s',
        label: '学业情况',
        dict: 'status'
      },
      {
        width: '40',
        type: 'select',
        prop: 'status_l',
        label: '位置',
        dict: 'status'
      },{
        width: '100',  // 宽度
        prop: 'card_id',  // prop接收数据
        label: '校卡号', // label名
        dict: 'card_id'  //  匹配是哪一个字典
      },{
        width: '100',
        type: 'input',
        prop: 'mailbox',
        label: '邮箱账号'
      },{
        width: '300',
        prop: 'dorm',
        label: '宿舍',
        dict: 'dorm'
      }
    ]
  }