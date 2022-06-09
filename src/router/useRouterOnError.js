export default function(router){
  router.onError(function(...args){
    console.log(args, 'routeronerror')
  })
}
