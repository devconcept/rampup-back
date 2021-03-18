import express, {Request, Response} from 'express';
import {data} from '../data';

const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response) {
  res.json(data);
});

router.get('/:id', function(req: Request, res: Response) {
  const id = parseInt(req.params.id as string, 10);
  const item = data.find(i => i.id === id);
  if (item) {
    res.json(item);
    return;
  }
  res.status(404).send("Not found");
});

router.post('/', function(req: Request, res: Response) {
  const last = data.reduce((curr, val) => (val.id > curr) ? val.id : curr, 0);
  const newItem = {id: last + 1, text: req.body.text, created: new Date().toISOString()};
  data.push(newItem);
  res.json(newItem);
});

router.delete('/:id', function(req: Request, res: Response) {
  const toDelete = parseInt(req.params.id as string, 10);
  const index = data.findIndex(i => i.id === toDelete);
  console.log(index);
  if (index !== -1) {
    data.splice(index, 1);
    res.status(204).send("");
    return;
  }
  res.status(404).send("Not found");
});

export default router;
