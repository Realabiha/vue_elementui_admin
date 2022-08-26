<template>
    <el-button type="primary" icon="el-icon-upload2" @click="onClick"><slot></slot></el-button> 
</template>
<style lang="scss" scoped>

</style>
<script>
import {withConfirm} from '../../utils/highOrder'
export default {
    name: 'Downloader',
    props: {
        filename: {
            required: false,
            type: String,
            default: 'helloword.txt'
        },
        url: {
            required:  false,
            type: String,
            default: ''
        },
        confirmText: {
            required: false,
            type: String,
            default: '此操作将永久删除该文件, 是否继续?' 
        }
    },
    methods: {
        onClick(){
            const {filename, url, confirmText} = this
            withConfirm.call(this, confirmText).call(this, async function(){
                const res = await fetch(url)
                if(res.status == 200){
                    const blob = await res.blob()
                    const blobUrl = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = blobUrl;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(blobUrl);
                }
            })
        }
        
    }
}
</script>