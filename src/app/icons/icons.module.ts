import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, Trash2, Send, Moon, Sun, Plus, Menu, BookOpen, Bold, Italic, Code, Link, CheckSquare, List, ChevronRight, Minus, Image, Type, Circle, Hash, ChevronsRight, Columns, Smile } from 'angular-feather/icons';

const icons = {
  Camera,
  Heart,
  Github,
  Trash2,
  Send,
  Moon,
  Sun,
  Plus,
  Menu,
  BookOpen,
  Bold,
  Italic,
  Smile,
  Code,
  Link, CheckSquare, List, ChevronRight, Minus, Image, Type, Circle, Hash, ChevronsRight, Columns
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule]
})
export class IconsModule { }
