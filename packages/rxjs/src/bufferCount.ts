import { bufferCount, range } from 'rxjs'

range(1, 10).pipe(bufferCount(3, 2)).subscribe(console.log)
/* 
  第2个参数startBufferEvery表示从头开始数，隔几个数据项就开一个新的缓冲区

  比如为2的时候，
  1.从1开始新建缓冲区
  2.隔2个数2，3，从3开始新建缓冲区
  ...
  然后每个缓冲区到达bufferSize时，就会发出缓冲区内的数据
*/
