import { World, Subtopic } from '../types/game';
import {
  subtopic1_1_challenges,
  subtopic1_2_challenges,
  subtopic1_3_challenges,
  subtopic1_4_challenges,
  subtopic1_5_challenges,
  subtopic1_6_challenges,
} from './challenges';
import {
  subtopic1_7_challenges,
  subtopic1_8_challenges,
  subtopic1_9_challenges,
} from './topic3Challenges';
import {
  subtopic1_10_challenges,
  subtopic1_11_challenges,
  subtopic1_12_challenges,
} from './topic4Challenges';
import {
  subtopic1_13_challenges,
  subtopic1_14_challenges,
  subtopic1_15_challenges,
} from './topic5Challenges';

export const subtopicsWorld1: Subtopic[] = [
  // -------------------------------------------------------------
  // TOPIC 1: MEET PYTHON
  // -------------------------------------------------------------
  {
    id: 'sub_1_1',
    code: '1.1',
    title: 'What is Python?',
    summary: 'Discover Python’s interpreted nature, readable design, and variable evaluation.',
    primaryMode: 'WHAT_HAPPENS_NEXT',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Recognize and trace what basic Python print statements and variable evaluation do.',
        challenges: subtopic1_1_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Use variable assignments and expressions to manipulate siege catapults and castle mechanisms.',
        challenges: subtopic1_1_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Trace state through distraction variables and multi-step mutations without error.',
        challenges: subtopic1_1_challenges[3] || [],
      },
    ],
  },
  {
    id: 'sub_1_2',
    code: '1.2',
    title: 'Sequential Execution',
    summary: 'Understand how Python processes instructions strictly from top to bottom, one by one.',
    primaryMode: 'WHAT_HAPPENS_NEXT',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Trace stepping stone scripts to understand top-to-bottom program flow.',
        challenges: subtopic1_2_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Synchronize chrono dials and portal mechanisms with dependent variables.',
        challenges: subtopic1_2_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Master the 3-variable swap algorithm to balance pressure-plate traps.',
        challenges: subtopic1_2_challenges[3] || [],
      },
    ],
  },
  {
    id: 'sub_1_3',
    code: '1.3',
    title: 'Program Structure',
    summary: 'Ensure variables exist before use, prevent NameError, and structure program logic.',
    primaryMode: 'ESCAPE_ROOM',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Inspect dungeon locks to identify which code structure avoids fatal NameErrors.',
        challenges: subtopic1_3_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Realign gear pillars by setting variables in the proper directional sequence.',
        challenges: subtopic1_3_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Override multi-tiered portcullis security overrides with cascading dependencies.',
        challenges: subtopic1_3_challenges[3] || [],
      },
    ],
  },

  // -------------------------------------------------------------
  // TOPIC 2: PYTHON BASICS
  // -------------------------------------------------------------
  {
    id: 'sub_1_4',
    code: '1.4',
    title: 'Statements & Indentation',
    summary: 'Master the sacred rules of Python indentation, colons, and block boundaries.',
    primaryMode: 'ESCAPE_ROOM',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Locate rogue indentation errors that halt mine elevators and magical torches.',
        challenges: subtopic1_4_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Distinguish between code inside an indented block vs code that executes after.',
        challenges: subtopic1_4_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Traverse nested multi-level indented scopes to break arcane crystal seals.',
        challenges: subtopic1_4_challenges[3] || [],
      },
    ],
  },
  {
    id: 'sub_1_5',
    code: '1.5',
    title: 'Comments',
    summary: 'Identify the hashtag (#) that silences instructions and preserves vital notes.',
    primaryMode: 'CODE_DETECTIVE',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Detect rogue hashtags (#) disabling defense wards in castle mechanisms.',
        challenges: subtopic1_5_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Differentiate between real comments and hashtags safeguarded inside string quotes.',
        challenges: subtopic1_5_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Analyze multi-line docstring scrolls with mixed commented and live instructions.',
        challenges: subtopic1_5_challenges[3] || [],
      },
    ],
  },
  {
    id: 'sub_1_6',
    code: '1.6',
    title: 'print()',
    summary: 'Command the arcane voice: argument separation, custom sep, and end parameters.',
    primaryMode: 'CODE_TIMER',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Beat the draining sand timer by forecasting comma-separated print output.',
        challenges: subtopic1_6_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Broadcast urgent coordinates using custom sep separator parameters under pressure.',
        challenges: subtopic1_6_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Rapidly predict combined sep and end overrides before the clock strikes zero!',
        challenges: subtopic1_6_challenges[3] || [],
      },
    ],
  },

  // -------------------------------------------------------------
  // TOPIC 3: VALUES & TYPES
  // -------------------------------------------------------------
  {
    id: 'sub_1_7',
    code: '1.7',
    title: 'Numbers',
    summary: 'Integers, floating-point numbers, and mathematical forces.',
    primaryMode: 'CODE_TIMER',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Decipher ancient numerical runes to distinguish whole integers from fractional floats.',
        challenges: subtopic1_7_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Calculate siege payloads, weight distributions, and resource tallies under time limits.',
        challenges: subtopic1_7_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Solve complex numerical state puzzles and rapid math evaluations before the clock expires.',
        challenges: subtopic1_7_challenges[3] || [],
      },
    ],
  },
  {
    id: 'sub_1_8',
    code: '1.8',
    title: 'Strings',
    summary: 'Text runes enclosed in quotes, escapes, and concatenations.',
    primaryMode: 'CODE_BUILDER',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Inspect arcane text runes enclosed within sacred single and double quote boundaries.',
        challenges: subtopic1_8_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Assemble shattered runic incantations using string concatenation and escaping mechanisms.',
        challenges: subtopic1_8_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Construct multi-part dialogue scrolls and dynamic message banners without syntax faults.',
        challenges: subtopic1_8_challenges[3] || [],
      },
    ],
  },
  {
    id: 'sub_1_9',
    code: '1.9',
    title: 'Basic Data Types',
    summary: 'Identify int, float, str, and bool in magical inscriptions.',
    primaryMode: 'ESCAPE_ROOM',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Inspect glowing inscriptions to categorize raw values as int, float, str, or bool.',
        challenges: subtopic1_9_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Disarm elemental gate barriers by validating expected types and preventing type clashes.',
        challenges: subtopic1_9_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Expose deceptive impostor data types and verify dynamic variable types in enchanted vaults.',
        challenges: subtopic1_9_challenges[3] || [],
      },
    ],
  },

  // -------------------------------------------------------------
  // TOPIC 4: VARIABLES
  // -------------------------------------------------------------
  {
    id: 'sub_1_10',
    code: '1.10',
    title: 'Creating Variables',
    summary: 'Naming rules, valid identifier runes, and memory allocation.',
    primaryMode: 'CODE_BUILDER',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Learn the naming laws of Spirehaven to identify legal variable runes and identifiers.',
        challenges: subtopic1_10_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Forge pristine storage containers that follow snake_case traditions and avoid reserved spell names.',
        challenges: subtopic1_10_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Construct complex multi-variable state inventories to prepare the party for dungeon exploration.',
        challenges: subtopic1_10_challenges[3] || [],
      },
    ],
  },
  {
    id: 'sub_1_11',
    code: '1.11',
    title: 'Assigning Values',
    summary: 'The single equal sign (=) assigns from right to left.',
    primaryMode: 'WHAT_HAPPENS_NEXT',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Follow the sacred single-arrow equal sign (=) that flows power from right to left.',
        challenges: subtopic1_11_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Trace dependent variable assignments that fuel ancient magical pumps and drawbridges.',
        challenges: subtopic1_11_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Untangle multi-step variable redistribution sequences and swap values between memory nodes.',
        challenges: subtopic1_11_challenges[3] || [],
      },
    ],
  },
  {
    id: 'sub_1_12',
    code: '1.12',
    title: 'Changing Variable Values',
    summary: 'Overwriting old memory states as the quest unfolds.',
    primaryMode: 'WHAT_HAPPENS_NEXT',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Trace how reassignment overwrites previous memory values in the crystal receptacle.',
        challenges: subtopic1_12_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Track accumulated buffs, health shifts, and inventory counts through sequential mutations.',
        challenges: subtopic1_12_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Forecast volatile multi-variable state mutations through deceptive misdirections.',
        challenges: subtopic1_12_challenges[3] || [],
      },
    ],
  },

  // -------------------------------------------------------------
  // TOPIC 5: SIMPLE INPUT & OUTPUT
  // -------------------------------------------------------------
  {
    id: 'sub_1_13',
    code: '1.13',
    title: 'input()',
    summary: 'Listening for user commands and converting raw string inputs.',
    primaryMode: 'WHAT_HAPPENS_NEXT',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Listen to wanderer commands through the input() portal and recognize that it always yields a string.',
        challenges: subtopic1_13_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Harness int() and float() conversions to turn raw wanderer text into potent numerical energy.',
        challenges: subtopic1_13_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Safeguard user input against conversion pitfalls and trace dynamic adventurer interactions.',
        challenges: subtopic1_13_challenges[3] || [],
      },
    ],
  },
  {
    id: 'sub_1_14',
    code: '1.14',
    title: 'Arithmetic Operators',
    summary: 'Addition, subtraction, multiplication, division, and modulo.',
    primaryMode: 'LAVA_RISING',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Wield +, -, *, and / to calculate quick escape paths as the molten lava rises!',
        challenges: subtopic1_14_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Master floor division (//) and the modulo remainder relic (%) to unlock stone puzzle tumblers.',
        challenges: subtopic1_14_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Deploy exponentiation (**) and compound arithmetic under rapid pressure to clear the lava chamber!',
        challenges: subtopic1_14_challenges[3] || [],
      },
    ],
  },
  {
    id: 'sub_1_15',
    code: '1.15',
    title: 'Combining Values and Expressions',
    summary: 'Operator precedence and compound spell formulas.',
    primaryMode: 'ESCAPE_ROOM',
    levels: [
      {
        tier: 1,
        name: 'UNDERSTAND',
        description: 'Observe operator precedence (PEMDAS) to predict the power outcome of composite formulas.',
        challenges: subtopic1_15_challenges[1] || [],
      },
      {
        tier: 2,
        name: 'APPLY',
        description: 'Combine strings, numbers, and arithmetic conversions to crack multi-layered puzzle locks.',
        challenges: subtopic1_15_challenges[2] || [],
      },
      {
        tier: 3,
        name: 'MASTER',
        description: 'Solve master-tier compound expressions with parentheses and mixed operators to conquer World 1!',
        challenges: subtopic1_15_challenges[3] || [],
      },
    ],
  },
];

export const worldsData: World[] = [
  {
    id: 1,
    number: 1,
    title: 'UNDERSTAND PYTHON',
    tagline: 'Grasp how Python thinks and executes before learning large amounts of syntax.',
    status: 'unlocked',
    environmentTheme: 'Verdant Forest & Ancient Ruin Waystones',
    topics: [
      {
        id: 'top_1_1',
        number: 1,
        title: 'Meet Python',
        description: 'Awaken the ancient interpreter and understand sequential logic flow.',
        subtopics: subtopicsWorld1.slice(0, 3), // 1.1, 1.2, 1.3
      },
      {
        id: 'top_1_2',
        number: 2,
        title: 'Python Basics',
        description: 'Master indentation rules, cryptic comments, and the sacred print() voice.',
        subtopics: subtopicsWorld1.slice(3, 6), // 1.4, 1.5, 1.6
      },
      {
        id: 'top_1_3',
        number: 3,
        title: 'Values & Types',
        description: 'Discover magical numbers, enchanted strings, and primal boolean states.',
        subtopics: subtopicsWorld1.slice(6, 9), // 1.7, 1.8, 1.9
      },
      {
        id: 'top_1_4',
        number: 4,
        title: 'Variables',
        description: 'Bind memory containers to hold treasures and mutate world state.',
        subtopics: subtopicsWorld1.slice(9, 12), // 1.10, 1.11, 1.12
      },
      {
        id: 'top_1_5',
        number: 5,
        title: 'Simple Input & Output',
        description: 'Receive adventurer input and evaluate arithmetic enchantments.',
        subtopics: subtopicsWorld1.slice(12, 15), // 1.13, 1.14, 1.15
      },
    ],
  },
  {
    id: 2,
    number: 2,
    title: 'MAKE DECISIONS',
    tagline: 'Branch paths with if, elif, and else. Guard the gates with boolean logic.',
    status: 'locked',
    environmentTheme: 'Whispering Crossroads & Sunken Citadel',
    topics: [],
  },
  {
    id: 3,
    number: 3,
    title: 'REPEAT LOGIC',
    tagline: 'Channel the power of loops: while gears and for traversals.',
    status: 'fogged',
    environmentTheme: 'The Endless Clocktower',
    topics: [],
  },
  {
    id: 4,
    number: 4,
    title: 'COMBINE EVERYTHING',
    tagline: 'Synthesize conditionals, loops, and state into complex puzzle contraptions.',
    status: 'fogged',
    environmentTheme: 'The Arcane Observatory',
    topics: [],
  },
  {
    id: 5,
    number: 5,
    title: 'ORGANIZE LOGIC',
    tagline: 'Cast reusable spells with functions, parameters, and return values.',
    status: 'fogged',
    environmentTheme: 'Grand Library of Spirehaven',
    topics: [],
  },
  {
    id: 6,
    number: 6,
    title: 'MODEL THINGS',
    tagline: 'Harness Object-Oriented magic: classes, instances, and enchanted relics.',
    status: 'fogged',
    environmentTheme: 'Golem Forge of Vulcan',
    topics: [],
  },
  {
    id: 7,
    number: 7,
    title: 'MANAGE INFORMATION',
    tagline: 'Organize inventories with lists, dictionaries, tuples, and sets.',
    status: 'fogged',
    environmentTheme: 'The Great Vaults of Midas',
    topics: [],
  },
  {
    id: 8,
    number: 8,
    title: 'FIND PROBLEMS',
    tagline: 'Defeat bug sprites, master tracebacks, and handle exceptions cleanly.',
    status: 'fogged',
    environmentTheme: 'The Corrupted Shadow Glade',
    topics: [],
  },
  {
    id: 9,
    number: 9,
    title: 'UNDERSTAND AI-GENERATED CODE',
    tagline: 'Critique, verify, and tame code whispered by synthetic familiars.',
    status: 'fogged',
    environmentTheme: 'The Hall of Mirror Golems',
    topics: [],
  },
  {
    id: 10,
    number: 10,
    title: 'MASTERY',
    tagline: 'The ultimate trials of computational wisdom and pure algorithmic dominion.',
    status: 'fogged',
    environmentTheme: 'The Celestial Summit',
    topics: [],
  },
];
