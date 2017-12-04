const db = require("../config/db.js")
const crypto = require('crypto');

class Icebreaker{
  static CreateTable() {
    const sql = `CREATE TABLE IF NOT EXISTS icebreakers (
      id INTEGER PRIMARY KEY, 
      question_id INTEGER,
      secret TEXT
    )`
    return new Promise(function(resolve){
      
      db.run(sql, function(){
        console.log("icebreakers table created")
        resolve("icebreakers table created")
      })
    })
  }

//   constructor(content){  // seems site controler is handeling this
//     this.content = content
//   }

//sub in correct columns. crypto 50:30 into part2
  insert(){
    const self = this
    const sql = `INSERT INTO icebreakers (question_id, secret) VALUES (?, ?)`
    this.secret = crypto.randomBytes(10).toString('hex')

    return new Promise(function(resolve){
      db.run(sql, [self.questionID, self.secret], function(err, result){
        self.id = this.lastID
        resolve(self)
      })
    })
  }

 //  static Find(id){
 //   const sql = "select * FROM icebreakers WHERE id = ?"

 //   return new Promise(function(resolve){
 //       db.get(sql, [id], function(err, results){ //want tp ise db.get
 //         const icebreaker = new Icebreaker() //not Icebreaker(results.content) b/c no contructor
 //         icebreaker.id = results.id 
 //         icebreaker.content = results.content
 //         resolve(icebreaker)
 //     })
 //   })
 // }

 //  static All(id){
	// 	const sql = "select * FROM icebreakers"

	// 	return new Promise(function(resolve){
	// 	  db.all(sql, function(err, results){ 
 //          let icebreakers = results.map(function(row){
 //            let q = new Icebreaker()
 //            q.content = row.content
 //            q.id = row.id
 //            return q
 //          })
				
	// 			resolve(icebreakers)
	// 	 	})
	// 	})
	// }


}

module.exports = Icebreaker;
