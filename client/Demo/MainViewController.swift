//
//  ViewController.swift
//  Demo
//
//  Created by hzyuxiaohua on 2017/1/16.
//  Copyright © 2017年 XY Network Co., Ltd. All rights reserved.
//

import UIKit

class MainViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    @IBOutlet weak var tableview: UITableView!
    
    private let cellIdentifier = "demo-list-cell-identifier"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        title = "Demo Lists"
        tableview.delegate = self
        tableview.dataSource = self
        tableview.register(UITableViewCell.self, forCellReuseIdentifier: cellIdentifier)
        
        _ = WebSocketClient.client.connect(url: "http://localhost:3000");
    }

    // MARK: - table view delegate and data source methods
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableview.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath)
        cell.textLabel?.text = "websocket"
        
        return cell
    }
}

