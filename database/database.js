import * as SQLite from 'expo-sqlite/next'; // Certifique-se de que o pacote está instalado

export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbQuiz.db');
    return cx;
}

export async function createTable() {    
    const cx = await getDbConnection();
    
    const tbTemas = `
    CREATE TABLE IF NOT EXISTS tbTemas (
        idTema INTEGER PRIMARY KEY AUTOINCREMENT,
        descTema TEXT NOT NULL 
    );`;
    
    const tbPerguntas = `
    CREATE TABLE IF NOT EXISTS tbPerguntas (
        idPergunta INTEGER PRIMARY KEY AUTOINCREMENT,
        idTema INTEGER,
        pergunta TEXT NOT NULL,
        FOREIGN KEY (idTema) REFERENCES tbTemas(idTema) ON DELETE CASCADE
        
    );`;

    const tbAlternativas = `
    CREATE TABLE IF NOT EXISTS tbAlternativas (
        idAlternativa INTEGER PRIMARY KEY AUTOINCREMENT,
        idPergunta INTEGER,
        alternativa TEXT NOT NULL,
        alternativaCorreta INTEGER, -- 0 incorreta / 1 correta
        FOREIGN KEY (idPergunta) REFERENCES tbPerguntas(idPergunta) ON DELETE CASCADE

    );`;

    try {
        await cx.execAsync(tbTemas);
        await cx.execAsync(tbPerguntas);
        await cx.execAsync(tbAlternativas);
    } catch (error) {
        console.error('Erro na criação das tabelas:', error);
    } finally {
        await cx.closeAsync();
    }
}


export async function listaTemas() {
    
    try{
        const retorno = [];
        const dbCx = await getDbConnection();
        const registros = await dbCx.getAllAsync('SELECT * FROM tbTemas');
    }catch(error){   
        console.error("Erro ao listar temas", error);
    }
    finally{
        await dbCx.closeAsync();
    }

    for (const registro of registros) {        
        let temas = {
            id: registro.idTema,
            nome: registro.descTema,
        };
        retorno.push(temas);
    }

    return retorno;
}

//Preciso pensar melhor sobre isso
export async function listaPeguntasporTemas() {
    const retorno = [];
    const dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT p.pergunta FROM tbTemas t INNER JOIN tbPerguntas p on t.idTema = p.idTema ');
    await dbCx.closeAsync();

    for (const registro of registros) {        
        let temas = {
            id: registro.idTema,
            nome: registro.descTema,
        };
        retorno.push(temas);
    }

    return retorno;
}

export async function adicionaTema(Tema) {   
    try{
        const dbCx = await getDbConnection();    
        const query = 'INSERT INTO tbTemas (descTema) VALUES (?)';
        await dbCx.runAsync(query, [Tema]);    
    }catch(error){
        console.log("Erro ao inserir um 'tema'.",error);
    } finally{
        await dbCx.closeAsync();
        return result.changes === 1;    
    }
}

export async function adicionaPergunta(pergunta) {    
    try{
        const dbCx = await getDbConnection();    
        const query = 'INSERT INTO tbPerguntas (pergunta, idTema) VALUES (?,?)';
        const result = await dbCx.runAsync(query, [pergunta.pergunta,pergunta.idTema]);    
    }catch(error){
        console.log("Erro ao inserir 'pergunta'",error);
    }
    finally{
        await dbCx.closeAsync();
        return result.changes === 1;    
    }
}

export async function adicionaAlternativas(alternativa) {    
    try{
        const dbCx = await getDbConnection();    
        const query = 'INSERT INTO tbAlternativas (alternativa, idPergunta, alternativaCorreta) VALUES (?,?,?)';
        const result = await dbCx.runAsync(query, [alternativa.alternativa,alternativa.idPergunta,alternativa.Correta]);    
    }
    catch(error){
        console.log("Erro ao inserir 'alternativa'",error);
    }
    
    finally{
        await dbCx.closeAsync();
        return result.changes === 1;    
    }   
}




