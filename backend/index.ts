import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { storage } from './multerConfig';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient, Db, ObjectId } from 'mongodb';

const upload = multer({ storage: storage });
const app = express();

const uri = 'mongodb+srv://DataBaseUser:GOVRB5iYAl5bWUwE@qtalcluster.oqq7ytq.mongodb.net/?retryWrites=true&w=majority&appName=QTALCluster';
const client = new MongoClient(uri);
let db: Db;

const connectToMongoDB = async () => {
  try {
    await client.connect();
    db = client.db('meubanco'); // Nome do banco de dados que você criou
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1); // Saia do processo se não puder conectar ao MongoDB
  }
};

connectToMongoDB();

const corsOptions = {
  origin: 'https://qtalgit.vercel.app', // Domínio do seu frontend hospedado no Vercel
  optionsSuccessStatus: 200,
  exposedHeaders: 'X-Custom-Header'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/files', express.static('uploads'));

// Middleware para verificar a conexão do MongoDB
const checkDbConnection = (req: Request, res: Response, next: NextFunction) => {
  if (!db) {
    return res.status(500).send('Database not connected');
  }
  next();
};

// Tipo para Request com DB
interface RequestWithDb extends Request {
  db?: Db;
}

// Middleware para adicionar db à requisição
app.use((req: RequestWithDb, res: Response, next: NextFunction) => {
  req.db = db;
  next();
});

// Rota para upload de arquivos
app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log('File uploaded:', req.file);
  return res.json(req.file.filename);
});

// Rota para adicionar um emissor ao banco de dados
app.post('/add-emissor', checkDbConnection, async (req: RequestWithDb, res: Response) => {
  const { Nome, Email, Contato, CNPJ, Servico, fileUrl } = req.body;

  if (!Nome || !Email || !Contato || !CNPJ || !Servico || !fileUrl) {
    return res.status(400).send('Missing fields in request body.');
  }

  try {
    const emissor = { Nome, Email, Contato, CNPJ, Servico, fileUrl };
    const result = await req.db!.collection('Emissor').insertOne(emissor);
    console.log('Emissor inserted successfully', result);

    res.status(200).send('Emissor added successfully');
  } catch (err) {
    console.error('Erro ao inserir dados:', (err as Error).message);
    res.status(500).send(`Erro ao inserir dados: ${(err as Error).message}`);
  }
});

// Rota para adicionar um funcionário ao banco de dados
// Rota para adicionar um funcionário ao banco de dados
app.post('/add-funcionario', checkDbConnection, async (req: RequestWithDb, res: Response) => {
  const { Nome, Email, Contato, CNPJ, Servico } = req.body;

  if (!Nome || !Email || !Contato || !CNPJ || !Servico) {
    return res.status(400).send('Missing fields in request body.');
  }

  try {
    const funcionario = { Nome, Email, Contato, CNPJ, Servico };
    const result = await req.db!.collection('Funcionarios').insertOne(funcionario);
    console.log('Funcionario inserted successfully', result);

    res.status(200).send('Funcionario added successfully');
  } catch (err) {
    console.error('Erro ao inserir dados:', (err as Error).message);
    res.status(500).send(`Erro ao inserir dados: ${(err as Error).message}`);
  }
});

// Rota para adicionar uma nota ao banco de dados
app.post('/add-nota', checkDbConnection, async (req: RequestWithDb, res: Response) => {
  const { cnpj, fileUrl } = req.body;

  if (!cnpj || !fileUrl) {
    return res.status(400).send('Missing fields in request body.');
  }

  try {
    // Buscar o funcionário pelo CNPJ
    const funcionarioData = await req.db!.collection('Funcionarios').findOne({ CNPJ: cnpj });

    if (!funcionarioData) {
      return res.status(404).send('Funcionário não encontrado');
    }

    // Inserir a nota com o ID do funcionário como string
    const nota = { funcionario: funcionarioData._id.toString(), fileUrl };
    const result = await req.db!.collection('Notas').insertOne(nota);
    console.log('Nota inserted successfully', result);

    res.status(200).send('Nota added successfully');
  } catch (err) {
    console.error('Erro ao inserir dados:', (err as Error).message);
    res.status(500).send(`Erro ao inserir dados: ${(err as Error).message}`);
  }
});

// Rota para buscar notas fiscais
app.get('/get-notas-fiscais', checkDbConnection, async (req: RequestWithDb, res: Response) => {
  try {
    const notasFiscais = await req.db!.collection('Notas').find().toArray();
    res.status(200).json(notasFiscais);
  } catch (err) {
    console.error('Erro ao buscar notas fiscais:', (err as Error).message);
    res.status(500).send(`Erro ao buscar notas fiscais: ${(err as Error).message}`);
  }
});

// Rota para buscar todos os funcionários do banco de dados
app.get('/get-funcionario', checkDbConnection, async (req: RequestWithDb, res: Response) => {
  const { cnpj } = req.query;

  if (!cnpj) {
    return res.status(400).send('CNPJ é necessário');
  }

  try {
    // Certifique-se de que a busca pelo CNPJ está considerando a formatação
    const funcionario = await req.db!.collection('Funcionarios').findOne({ CNPJ: cnpj });

    if (!funcionario) {
      return res.status(404).send('Funcionário não encontrado');
    }

    res.status(200).json(funcionario);
  } catch (err) {
    console.error('Erro ao buscar funcionário:', (err as Error).message);
    res.status(500).send(`Erro ao buscar funcionário: ${(err as Error).message}`);
  }
});

app.get('/get-funcionarios', checkDbConnection, async (req: RequestWithDb, res: Response) => {
  try {
    const funcionarios = await req.db!.collection('Funcionarios').find().toArray();
    res.status(200).json(funcionarios);
  } catch (err) {
    console.error('Erro ao buscar funcionários:', (err as Error).message);
    res.status(500).send(`Erro ao buscar funcionários: ${(err as Error).message}`);
  }
});


// Rota para adicionar um produto ao banco de dados
app.post('/add-produto', checkDbConnection, async (req: RequestWithDb, res: Response) => {
  const { Nome, Quantidade } = req.body;

  if (!Nome || isNaN(Quantidade)) {
    return res.status(400).send('Missing or invalid fields in request body.');
  }

  try {
    const produto = { Nome, Quantidade };
    const result = await req.db!.collection('Produtos').insertOne(produto);
    console.log('Produto inserted successfully', result);

    res.status(200).send('Produto added successfully');
  } catch (err) {
    console.error('Erro ao inserir dados:', (err as Error).message);
    res.status(500).send(`Erro ao inserir dados: ${(err as Error).message}`);
  }
});

// Rota para atualizar a quantidade de um produto
app.patch('/update-produto/:id', checkDbConnection, async (req: RequestWithDb, res: Response) => {
  const produtoId = req.params.id;
  let { quantidade } = req.body;

  if (typeof quantidade === 'string') {
    quantidade = parseFloat(quantidade); // Converte para número float, use parseInt() se for int
  }

  if (isNaN(quantidade)) {
    return res.status(400).send('A quantidade deve ser um número válido.');
  }

  try {
    // Logando os dados recebidos
    console.log('Produto ID:', produtoId);
    console.log('Quantidade para atualizar:', quantidade);

    // Atualizando a quantidade diretamente
    const result = await req.db!.collection('Produtos').updateOne(
      { _id: new ObjectId(produtoId) },
      { $inc: { Quantidade: quantidade } } // Incrementa (ou decrementa) a quantidade
    );

    // Verificando o resultado da operação
    console.log('Resultado da atualização:', result);

    if (result.matchedCount === 0) {
      return res.status(404).send('Produto não encontrado.');
    }

    console.log('Produto atualizado com sucesso', result);
    res.status(200).send('Produto atualizado com sucesso');
  } catch (err) {
    console.error('Erro ao atualizar produto:', (err as Error).message);
    res.status(500).send(`Erro ao atualizar produto: ${(err as Error).message}`);
  }
});

// Rota para buscar um funcionário pelo ID
app.get('/get-funcionario/:id', checkDbConnection, async (req: RequestWithDb, res: Response) => {
  const funcionarioId = req.params.id;

  try {
    const funcionario = await req.db!.collection('Funcionarios').findOne({ _id: new ObjectId(funcionarioId) });

    if (!funcionario) {
      return res.status(404).send('Funcionário não encontrado');
    }

    res.status(200).json(funcionario);
  } catch (err) {
    console.error('Erro ao buscar funcionário:', (err as Error).message);
    res.status(500).send(`Erro ao buscar funcionário: ${(err as Error).message}`);
  }
});


// Rota para buscar todos os produtos
app.get('/get-produtos', checkDbConnection, async (req: RequestWithDb, res: Response) => {
  try {
    const produtos = await req.db!.collection('Produtos').find().toArray();
    res.status(200).json(produtos);
  } catch (err) {
    console.error('Erro ao buscar produtos:', (err as Error).message);
    res.status(500).send(`Erro ao buscar produtos: ${(err as Error).message}`);
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
