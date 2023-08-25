// 案件详情
<template>
  <el-col :span="10">
    <!-- <h3>拖拽排序</h3>
    <ul ref="wrap">
      <li
        v-for="(item, index) in [1,2,3,4,5,6,7,8,9]"
        :key="index"
        style="width: 100vw; height: 4rem;border-bottom: 1px solid"
        draggable
        @dragstart="dragStart"
        @dragend="dragEnd"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @dragover="dragOver"
        @drop="onDrop"
      >{{item}}</li>
    </ul>-->
    <h3>拖拽上传</h3>
    <div
      v-permission="'case_user_upload'"
      class="drop_container"
      style="width: 666px; height: 30rem; background: pink; border: 1px dashed"
      @dragenter.prevent="dragEnter"
      @dragleave="dragLeave"
      @dragover.prevent="dragOver"
      @drop.prevent="onDrop1"
    >
      <el-button>拖到这里上传</el-button>
    </div>
  </el-col>
</template>
<style lang="scss" scoped>
.drop_container {
  h1 {
    display: none !important;
  }
}
</style>
<script>
import SparkMD5 from "spark-md5";
export default {
  name: "CaseDetail",
  drag: null,
  data() {
    return {};
  },
  methods: {
    // 被拖拽对象
    dragStart(e) {
      this.$options.drag = e.target;
      e.target.style.background = "yellow";
    },
    dragEnd(e) {
      e.target.style.background = "red";
    },

    // 拖拽目标区域
    dragEnter(e) {
      // console.log(e, "enter");
    },
    dragLeave(e) {
      // console.log(e, "leave");
    },
    dragOver(e) {
      // console.log(e, "over");
      // 拖拽时鼠标样式
      // e.dataTransfer.dropEffect = 'move'
    },
    onDrop(e) {
      this.$refs.wrap.insertBefore(this.$options.drag, e.target);
      this.$options.drag = null;
    },
    onDrop1(e) {
      let begin = Date.now();

      class FileSlice extends SparkMD5 {
        constructor(file, callback, chunkSize) {
          super();
          this.file = file;
          this.chunkSize = chunkSize || 1024 * 1024;
          this.chunks = [];
          this.hash = "";
          this.sliced = 0;
          this.finish = false;
          this.error = "";
          this.callback = callback || function() {};
          this.start();
          console.log("开始切片");
        }
        start() {
          this.slice();
        }
        slice() {
          const chunk = this.file.slice(
            this.sliced,
            this.sliced + this.chunkSize
          );
          this.chunkHash(chunk);
          this.chunks.push(chunk);
          this.sliced += this.chunkSize;
        }
        chunkHash(blob) {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(blob);
          fileReader.onload = e => {
            this.append(e.target.result);
            console.log(`第${this.sliced / this.chunkSize}片切分完成`);
            if (this.sliced >= this.file.size) {
              this.finish = true;
              this.hash = this.end();
              this.callback(this);
              console.log(`全部切片完成，hsah值${this.hash}`);
              return;
            }
            // webworker或定时器 防止文件过大阻塞主线程
            setTimeout(_ => this.slice());
            // this.slice();
          };
          fileReader.onerror = error => {
            console.log(error);
            this.error = error;
            this.callback(this);
          };
        }
      }
      class Schduler {
        constructor(max) {
          this.max = max ? Math.min(max, 6) : 6;
          this.queue = [];
          this.running = 0;
          this.count = 0;
        }
        request(request) {
          return new Promise((resolve, reject) => {
            this.queue.push({ request, resolve, reject });
            this.next(resolve, reject);
          });
        }
        next() {
          if (this.running < this.max && this.queue.length) {
            const { request, resolve, reject } = this.queue.shift();
            request &&
              request()
                .then(resolve)
                .catch(reject)
                .finally(_ => {
                  this.count++;
                  this.running--;
                  this.next();
                });

            this.running++;
          }
        }
      }
      class Uploader extends Schduler {
        constructor(file, max) {
          super(max);
          this.results = [];
          this.chunks = this.seal(file);
          this.filteredChunks = [];
          this.finish = false;
        }
        seal(file) {
          return file.chunks.map((chunk, index) => {
            const formdata = new FormData();
            const data = {
              chunkNum: index + 1,
              chunkSize: file.chunkSize,
              currentChunkSize: chunk.size,
              totalChunks: file.chunks.length,
              fileSize: file.size,
              fileHash: file.hash,
              fileName: file.name,
              chunkName: `${file.hash}_index`
            };
            formdata.append("file", data);
            return formdata;
          });
        }
        filter(uploaded = []) {
          this.filteredChunks = this.chunks.filter(
            chunk => !uploaded.includes(chunk)
          );
        }
        upload(uploaded = []) {
          this.filter(uploaded);
          return new Promise((resolve, reject) => {
            this.filteredChunks.forEach((data, index) => {
              const request = function() {
                const delay = Math.random(0, 1) * 100;
                return new Promise(resolve => {
                  setTimeout(_ => resolve(data), delay);
                });
              };
              this.request(request)
                .then(res => {
                  this.results.push(res);
                  console.log(
                    `${parseInt(
                      (this.results.length / this.filteredChunks.length) * 100
                    )}%已上传完成`
                  );
                  if (this.results.length === this.filteredChunks.length) {
                    this.finish = true;
                    resolve(this.results);
                    // TODO
                    // 合并文件
                    console.log("开始合并文件");
                  }
                })
                .catch(reject);
            });
          });
        }
      }

      const { files } = e.dataTransfer;
      Object.values(files).forEach(file => {
        new FileSlice(file, async instance => {
          const uploader = new Uploader(instance);
          try {
            await uploader.upload();
            const time = Date.now() - begin;
            console.log(time, "time");
          } catch (error) {
            console.log(error, "error");
          }
        });
      });
    }
  }
};
</script>