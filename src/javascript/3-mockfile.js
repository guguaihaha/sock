var host = {
    index:'http://www.job.com'
}

var Router = {
    getCat:{
        host:host.index,
        path:'/getMine',
        type:'get',
        response:{
            status:200,
            data:[1,2,3]
        }
    }
}










for(var item in Router){

  Mock.mock(Router[item].host+Router[item].path,Router[item].type,function(options){
      return Router[item].response
  })
}



