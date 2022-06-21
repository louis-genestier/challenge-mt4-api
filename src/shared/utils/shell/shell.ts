import { readFile } from 'fs/promises'
import { Client, ConnectConfig } from 'ssh2'

export class Shell {
  private readonly conn: Client

  constructor() {
    this.conn = new Client()
  }

  async exec(ctx: ConnectConfig, command: string) {
    const privateKey = await readFile('private-key')

    let stdout: string, stderr: string
    return new Promise((resolve, reject) => {
      this.conn
        .on('ready', () => {
          this.conn.exec(command, (err, stream) => {
            if (err) reject(err)
            stream
              .on('close', () => {
                this.conn.end()
              })
              .on('data', (data: string) => {
                stdout = data
              })
              .stderr.on('data', (data: string) => {
                stderr = data
              })
          })
        })
        .connect({ ...ctx, privateKey })

      resolve({ stdout, stderr })
    })
  }
}
