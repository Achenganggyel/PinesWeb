export const TeacherCol = {
      cols: [{
        width: '100',  // 宽度
        type: 'input',  // 类型
        prop: 'id',  // prop接收数据
        label: '工号', // label名
        dict: 'id'  //  匹配是哪一个字典
      },
      {
        width: '200',
        type: 'input',
        prop: 'name',
        label: '姓名',
        dict:'name'
      },
      {
        width: '50',
        type: 'select',
        prop: 'gender',
        label: '性别',
        dict:'gender'
      },
      {
        width: '200',
        type: 'select',
        prop: 'department',
        label: '部门',
        dict: 'department'
      },
      {
        width: '150',
        type: 'input',
        prop: 'post',
        label: '职位',
      },
      {
        width: '20',
        type: 'select',
        prop: 'status',
        label: '状态',
        dict: 'status'
      },{
        width: '150',
        type: 'datePicker',
        prop: 'reg_time',
        label: '注册时间',
      },{
        width: '150',
        type: 'datePicker',
        prop: 'birth',
        label: '出生日期',
      },{
        width: '50',
        type: 'input',
        prop: 'thism_attendance',
        label: '出勤率'
      },{
        width: '100',
        type: 'input',
        prop: 'mailbox',
        label: '邮箱账号'
      }
    ]
  }