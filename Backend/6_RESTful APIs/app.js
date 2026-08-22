const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let quoraPost = [
  {
    id: uuidv4(),
    username: 'CodeExplorer_21',
    content:
      'What is the best way to learn React in 2026? Honestly, skip the 10-hour tutorials. Start by reading the official documentation and immediately build a small project, like a task tracker or a weather dashboard. You learn by breaking things, not by watching someone else code.',
  },
  {
    id: uuidv4(),
    username: 'HistoryBuff_Sarah',
    content:
      'Did the Romans really use flaming pigs in war? Yes, they did! According to historical accounts, they used them to counter war elephants. The squealing and the fire would panic the elephants, causing them to trample their own troops.',
  },
  {
    id: uuidv4(),
    username: 'InvestSmartly',
    content:
      'Is it too late to start investing at 35? Absolutely not. Assuming you plan to retire at 65, you still have 30 years for your money to compound. Start by building a 6-month emergency fund, then look into low-cost S&P 500 index funds.',
  },
  {
    id: uuidv4(),
    username: 'Wanderlust_Mike',
    content:
      'What is the most underrated country to visit in Europe? Slovenia. It has the dramatic mountains of Switzerland, the beautiful coastline of Italy, and incredibly charming lakes like Lake Bled, all at a fraction of the cost and with way fewer tourists.',
  },
  {
    id: uuidv4(),
    username: 'Chef_Anna_Bakes',
    content:
      'Why do my chocolate chip cookies always come out flat? The most common reason is that your butter is too warm. It should be room temperature, not melting. Also, try chilling your dough in the fridge for at least 30 minutes before baking to stop them from spreading too fast!',
  },
  {
    id: uuidv4(),
    username: 'StoicMindset',
    content:
      'What is a harsh truth about life that everyone needs to hear? Nobody is coming to save you. Your career, your health, and your happiness are entirely your responsibility. Once you accept this, it stops being depressing and starts being incredibly empowering.',
  },
  {
    id: uuidv4(),
    username: 'SpaceNerd_99',
    content:
      "What happens if an astronaut takes off their helmet in space? You wouldn't freeze or explode instantly like in the movies. The lack of oxygen would cause you to pass out in about 15 seconds, and your bodily fluids would start to boil due to the lack of pressure. It's a quick but terrifying way to go.",
  },
  {
    id: uuidv4(),
    username: 'Fitness_Coach_Dan',
    content:
      "How do I lose belly fat without doing 1,000 crunches a day? You can't spot-reduce fat. Crunches build abdominal muscle, but they won't burn the fat on top of it. You need to be in a caloric deficit. Focus on eating fewer calories than you burn, eating high protein, and lifting weights.",
  },
  {
    id: uuidv4(),
    username: 'ProductivityHacker',
    content:
      "What is the '2-Minute Rule' and does it work? The 2-Minute Rule states that if a task takes less than two minutes to complete (like replying to a quick email or washing your coffee mug), do it immediately. It prevents small tasks from piling up and causing anxiety. It totally transformed my workflow.",
  },
  {
    id: uuidv4(),
    username: 'Cinephile_Reviewer',
    content:
      'What is the most perfectly cast movie role of all time? It has to be J.K. Simmons as J. Jonah Jameson in the Spider-Man trilogy. He perfectly captured the fast-talking, cigar-chomping energy of the comic book character. No one else could ever play that role.',
  },
];

app.get('/posts', (req, res) => {
  res.render('index', { posts: quoraPost });
});

app.get('/posts/new', (req, res) => {
  res.render('form');
});

app.post('/posts', (req, res) => {
  let { username, content } = req.body; //* always write the name field value of form here
  let id = uuidv4();
  quoraPost.push({ id, username, content });
  res.redirect('/posts'); //* By default it is always a 'GET' request!
});

app.get('/posts/:id', (req, res) => {
  let { id } = req.params;
  const post = quoraPost.find((post) => id === post.id);
  res.render('show', { post });
});

app.patch('/posts/:id', (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  const post = quoraPost.find((post) => id === post.id);
  post.content = newContent;
  res.redirect('/posts');
});

app.get('/posts/:id/edit', (req, res) => {
  let { id } = req.params;
  const post = quoraPost.find((post) => id === post.id);
  res.render('edit', { post });
});

app.delete('/posts/:id', (req, res) => {
  let { id } = req.params;
  quoraPost = quoraPost.filter((post) => id !== post.id);
  res.redirect("/posts");
})


app.listen(port, () => {
  console.log('Listening to the port 3000');
});
