import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { storage } from './multerConfig';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient, Db } from 'mongodb';

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

app.use(cors());
app.use(bodyParser.json());
app.use('/files', express.static('uploads'));

// Middleware para verificar a conexão do MongoDB
const checkDbConnection = (req: Request, res: Response, next: NextFunction) => {
  if (!db) {
    return res.status(500).send('Database not connected');
  }
  next();
};

// Rota para upload de arquivos
app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log('File uploaded:', req.file);
  return res.json(req.file.filename);
});

// Rota para adicionar um emissor ao banco de dados
app.post('/add-emissor', checkDbConnection, async (req: Request, res: Response) => {
  const { Nome, Email, Contato, CNPJ, Servico, fileUrl } = req.body;

  if (!Nome || !Email || !Contato || !CNPJ || !Servico || !fileUrl) {
    return res.status(400).send('Missing fields in request body.');
  }

  try {
    const emissor = { Nome, Email, Contato, CNPJ, Servico, fileUrl };
    const result = await db.collection('Emissor').insertOne(emissor);
    console.log('Emissor inserted successfully', result);

    res.status(200).send('Emissor added successfully');
  } catch (err) {
    console.error('Erro ao inserir dados:', (err as Error).message);
    res.status(500).send(`Erro ao inserir dados: ${(err as Error).message}`);
  }
});

// Rota para adicionar um funcionário ao banco de dados
app.post('/add-funcionario', checkDbConnection, async (req: Request, res: Response) => {
  const { Nome, Email, Contato, CNPJ, Servico } = req.body;

  if (!Nome || !Email || !Contato || !CNPJ || !Servico) {
    return res.status(400).send('Missing fields in request body.');
  }

  try {
    const funcionario = { Nome, Email, Contato, CNPJ, Servico };
    const result = await db.collection('Funcionarios').insertOne(funcionario);
    console.log('Funcionario inserted successfully', result);

    res.status(200).send('Funcionario added successfully');
  } catch (err) {
    console.error('Erro ao inserir dados:', (err as Error).message);
    res.status(500).send(`Erro ao inserir dados: ${(err as Error).message}`);
  }
});

// Rota para adicionar uma nota ao banco de dados
app.post('/add-nota', checkDbConnection, async (req: Request, res: Response) => {
  const { funcionario, fileUrl } = req.body;

  if (!funcionario || !fileUrl) {
    return res.status(400).send('Missing fields in request body.');
  }

  try {
    const nota = { funcionario, fileUrl };
    const result = await db.collection('Notas').insertOne(nota);
    console.log('Nota inserted successfully', result);

    res.status(200).send('Nota added successfully');
  } catch (err) {
    console.error('Erro ao inserir dados:', (err as Error).message);
    res.status(500).send(`Erro ao inserir dados: ${(err as Error).message}`);
  }
});

// Rota para buscar todos os funcionários do banco de dados
app.get('/get-funcionarios', checkDbConnection, async (req: Request, res: Response) => {
  try {
    const funcionarios = await db.collection('Funcionarios').find().toArray();
    res.status(200).json(funcionarios);
  } catch (err) {
    console.error('Erro ao buscar funcionários:', (err as Error).message);
    res.status(500).send(`Erro ao buscar funcionários: ${(err as Error).message}`);
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
