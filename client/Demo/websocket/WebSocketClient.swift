//
//  WebSocketClient.swift
//  Demo
//
//  Created by hzyuxiaohua on 2017/1/17.
//  Copyright © 2017年 XY Network Co., Ltd. All rights reserved.
//

import Foundation

import SocketIO
import SocketRocket

class WebSocketClient {
    private var socket: SocketIOClient? = nil
    static var client: WebSocketClient = WebSocketClient()
    
    public func connect(url: String) -> Bool {
        socket = SocketIOClient(socketURL: URL(string: url)!, config: [.log(false), .forcePolling(false)]);
        installHandler(withSocket: socket)
        socket?.connect()
        
        return true
    }
    
    public func write(data: Any?) {
        var message: Data? = nil
        if data is String {
            message = (data as! String).data(using: .utf8)
        } else if (data is Data) {
            message = data as? Data
        } else {
            return
        }
        
        guard message != nil else {
            return
        }
        
        socket?.emit("data", with: [message!])
    }
    
    private func installHandler(withSocket socket:SocketIOClient?) -> Void {
        guard socket != nil else {
            return
        }
        
        socket?.on("connect") { data, ack in
            print("connection has established")
            
            if ack.expected {
                ack.with("hei, connected successfully.")
            }
            
            let ack = socket?.emitWithAck("register", with: ["xiaoming"])
            ack?.timingOut(after: 20, callback: { (data) in
                print("ack.res \(data[0])")
            })
        }
        
        socket?.onAny { (event) in
            print("recevie event:\(event)")
        }
        
        socket?.on("greeting", callback: { (data, ack) in
            print("receive message:\(data)")
        })
    }
}
