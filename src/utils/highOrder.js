export const withConfirm = function(confirmText){
    return async function(callback){
        try {
            await this.$confirm(confirmText, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            callback()
        } catch (error) {
            console.log(error)
        }
    }
}