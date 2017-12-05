const db = require("../config/db.js")

class Question{
  static CreateTable() {
    const sql = `CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY,
      content TEXT
    )`
    return new Promise(function(resolve){
      
      db.run(sql, function(){
        console.log("questions table created")
        resolve("questions table created")
      })
    })
  }

//   constructor(content){  // seems site controler is handeling this
//     this.content = content
//   }

  insert(){
    const self = this
    const sql = `INSERT INTO questions (content) VALUES (?)`
    return new Promise(function(resolve){
      db.run(sql, [self.content], function(err, result){
        self.id = this.lastID
        resolve(self)
      })
    })
  }

  static Find(id){
   const sql = "select * FROM questions WHERE id = ?"

   return new Promise(function(resolve){
       db.get(sql, [id], function(err, results){ 
         const question = new Question() 
         question.id = results.id 
         question.content = results.content
         resolve(question)
     })
   })
 }

  static All(id){
		const sql = "select * FROM questions"

		return new Promise(function(resolve){
		  db.all(sql, function(err, results){ 
          let questions = results.map(function(row){
            let q = new Question()
            q.content = row.content
            q.id = row.id
            return q
          })
				
				resolve(questions)
		 	})
		})
	}


}

module.exports = Question;
