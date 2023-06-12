import SparkMD5 from 'spark-md5'
const spark = new SparkMD5()
const fileReader = new FileReader()
const readAsArrayBuffer = function (chunkFile) {
  return new Promise((resolve, reject) => {
    fileReader.readAsArrayBuffer(chunkFile)
    fileReader.onload = function (e) {
      resolve(e.target.result)
    }
    fileReader.onerror = function (e) {
      reject(e)
    }
  })
}
const upload = async function (chunk) {
  await console.log(chunk.id)
}
let [touchedFileSize, chunks, chunkSize, currentChunk] = [0, [], 66 * 1024, 0]
export const splitFileChunks = async function (file) {
  const [start, end] = [touchedFileSize, touchedFileSize + chunkSize]
  const chunkFile = file.slice(start, end)
  const arrayBuffer = await readAsArrayBuffer(chunkFile)
  spark.append(arrayBuffer)
  const chunkId = `${file.name}_${currentChunk += 1}`
  chunks.push({ file: chunkFile, id: chunkId })
  touchedFileSize = end > file.size ? file.size : end

  if (touchedFileSize >= file.size) {
    const fileHash = spark.end()
    chunks.forEach(upload)
    self.postMessage(fileHash)
    return
  }

  splitFileChunks(file)
}

