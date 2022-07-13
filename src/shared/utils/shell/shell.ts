import { readFile } from 'fs/promises'
import { Client, ConnectConfig } from 'ssh2'

export class Shell {
  private readonly conn: Client

  constructor() {
    this.conn = new Client()
  }

  async exec(
    ctx: ConnectConfig,
    command: string,
  ): Promise<{ stdout: string; stderr: string }> {
    const privateKey = await readFile('private-key')

    let stdout: string, stderr: string
    return new Promise((resolve, reject) => {
      this.conn
        .on('ready', () => {
          this.conn.exec(command, (err, stream) => {
            if (err) {
              reject(err)
              return
            }
            stream
              .on('close', () => {
                this.conn.end()
                resolve({ stdout, stderr })
              })
              .on('data', (data: string) => {
                stdout = data.toString().trim()
              })
              .stderr.on('data', (data: string) => {
                stderr = data.toString().trim()
              })
          })
        })
        .connect({ ...ctx, privateKey, readyTimeout: 1500 })
    })
  }
}
