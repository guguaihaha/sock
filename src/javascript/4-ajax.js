$.ajax({
    url:"http://www.job.com/getMine",
    type:"get",
    success:function(data){
        // console.log(data)
    },
    error:function(e){
        console.log(e)
    }
})