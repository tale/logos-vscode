import {
	CompletionItem,
	CompletionItemKind,
	Hover,
	MarkdownString,
	SnippetString,
} from 'vscode';

// Constructor
const ctorMarkdown = new MarkdownString(
	'#### Logos Constructor\n```\n%ctor {\n\t/* body */\n}\n```\nGenerate an anonymous constructor (of default priority).\nThis function is executed after the binary is loaded into memory.\n`argc`, `argv`, and `envp` are implicit arguments so they can be used as they would be in a `main` function.'
);

const ctorCompletion = new CompletionItem('ctor');
ctorCompletion.kind = CompletionItemKind.Constructor;
ctorCompletion.insertText = new SnippetString('ctor {\n\t${1}\n}');
ctorCompletion.detail = 'Constructor';
ctorCompletion.documentation = ctorMarkdown;

const ctorHover = new Hover(ctorMarkdown);

// Deconstructor
const dtorMarkdown = new MarkdownString(
	'#### Logos Deconstructor\n```\n%dtor {\n\t/* body */\n}\n```\nGenerate an anonymous deconstructor (of default priority).\nThis function is executed before the binary is unloaded from memory.\n`argc`, `argv`, and `envp` are implicit arguments so they can be used as they would be in a `main` function.'
);

const dtorCompletion = new CompletionItem('dtor');
dtorCompletion.kind = CompletionItemKind.Constructor;
dtorCompletion.insertText = new SnippetString('dtor {\n\t${1}\n}');
dtorCompletion.detail = 'Deconstructor';
dtorCompletion.documentation = dtorMarkdown;

const dtorHover = new Hover(dtorMarkdown);

// Group
const groupMarkdown = new MarkdownString(
	'#### Logos Group\n```\n%group GroupName\n/* %hooks */\n%end\n```\nGenerate a hook group with the name `GroupName`.\nGroups can be used for conditional initialization or code organization.\nAll ungrouped hooks are in the default group, initializable via `%init` without arguments.\nCannot be inside another `%group` block.\nGrouping can be used to manage backwards compatibility with older \n\n**Example**:\n```\n%group iOS8\n%hook IOS8_SPECIFIC_CLASS\n// your code here\n%end // end hook\n%end // end group ios8\n\n%group iOS9\n%hook IOS9_SPECIFIC_CLASS\n// your code here\n%end // end hook\n%end // end group ios9\n\n%ctor {\n\tif (kCFCoreFoundationVersionNumber > 1200) {\n\t\t%init(iOS9);\n\t} else {\n\t\t%init(iOS8);\n\t}\n}\n```'
);

const groupCompletion = new CompletionItem('group GroupName');
groupCompletion.kind = CompletionItemKind.Function;
groupCompletion.insertText = new SnippetString(
	'group ${1:GroupName}\n$0\n%end'
);
groupCompletion.detail = 'Group';
groupCompletion.documentation = groupMarkdown;

const groupHover = new Hover(groupMarkdown);

// Hook
const hookMarkdown = new MarkdownString(
	'### Logos Hook\n```\n%hook ClassName\n/* objc methods */\n%end\n```\nOpen a hook block for the class named `ClassName`.\nCan be inside a `%group` block.\n\n**Example**:\n```\n%hook SBApplicationController\n- (void)uninstallApplication:(SBApplication *)application {\n\tNSLog(@"Hey, we\'re hooking uninstallApplication:!");\n\t%orig; // Call the original implementation of this method\n}\n%end\n```'
);

const hookCompletion = new CompletionItem('hook HookName');
hookCompletion.kind = CompletionItemKind.Function;
hookCompletion.insertText = new SnippetString('hook ${1:HookName}\n$0\n%end');
hookCompletion.detail = 'Hook';
hookCompletion.documentation = hookMarkdown;

const hookHover = new Hover(hookMarkdown);

// New
const newMarkdown = new MarkdownString(
	'#### Logos New Method\n```\n%new\n/* objc method */\n```\n\n```\n%new(signature)\n/* objc method */\n```\nAdd a new method to a hooked class or subclass by adding this directive above the method definition.\n`signature` is the Objective - C type encoding for the new method; if it is omitted, one will be generated.\nMust be inside a `%hook` or `%subclass` block.\n\n**Example:**\n```\n%new\n- (void)handleTapGesture:(UITapGestureRecognizer *)gestureRecognizer {\n\tNSLog(@"Recieved tap: %@", gestureRecognizer);\n}\n```'
);

const new1Completion = new CompletionItem('new');
new1Completion.kind = CompletionItemKind.Method;
new1Completion.insertText = new SnippetString('new\n${1}');
new1Completion.detail = 'New';
new1Completion.documentation = newMarkdown;

const new2Completion = new CompletionItem('new(signature)');
new2Completion.kind = CompletionItemKind.Method;
new2Completion.insertText = new SnippetString('new(${1:signature})\n$0');
new2Completion.detail = 'New (Signature)';
new2Completion.documentation = newMarkdown;

const newHover = new Hover(newMarkdown);

// Subclass
const subclassMarkdown = new MarkdownString(
	'#### Logos Subclass\n```\n%subclass ClassName: Superclass <Protocol list>\n/* %properties and methods */\n%end\n```\nGenerate a subclass at runtime.\nLike `@property` in normal Objective - C classes, you can use `%property` to add properties to the subclass.\nThe `%new` specifier is needed for a method that doesn\'t exist in the superclass.\nTo instantiate an object of the new class, you can use the `%c` operator.\nCan be inside a `%group` block.\n\n**Example:**\n```\n%subclass ClassName : SBIcon\n%property (nonatomic, retain) NSString * someValue;\n\n- (instancetype)init {\n\tif ((self = %orig)) {\n\t\t[self setSomeValue:@"value"];\n\t}\n\treturn self;\n}\n%end\n\n%ctor {\n\tClassName *myObject = [[%c(ClassName) alloc] init];\n\tNSLog(@"myObject: %@", [myObject someValue]);\n}\n```'
);

const subclassCompletion = new CompletionItem(
	'subclass ClassName : SuperClass'
);
subclassCompletion.kind = CompletionItemKind.Interface;
subclassCompletion.insertText = new SnippetString(
	'subclass ${1:ClassName} : ${2:SuperClass}\n$0\n%end'
);
subclassCompletion.detail = 'Subclass';
subclassCompletion.documentation = subclassMarkdown;

const subclassHover = new Hover(subclassMarkdown);

// Property
const propertyMarkdown = new MarkdownString(
	'#### Logos Property\n```\n%property (nonatomic|assign|retain|copy|weak|strong|getter=...|setter=...) Type name;\n```\nAdd a property to a `%subclass` just like you would with `@property` to a normal Objective - C subclass as well as adding new properties to existing classes within `%hook`.\nMust be inside a `%hook` or `%subclass` block.'
);

const propertyCompletion = new CompletionItem(
	'property (attributes...) Type name'
);
propertyCompletion.kind = CompletionItemKind.Property;
propertyCompletion.insertText = new SnippetString(
	'property (${1:attributes...}) ${2:Type} ${0:name}'
);
propertyCompletion.detail = 'Property';
propertyCompletion.documentation = propertyMarkdown;

const propertyHover = new Hover(propertyMarkdown);

// End
const endMarkdown = new MarkdownString(
	'#### Logos End Directive\n```\n%end\n```\nClose a `%group`, `%hook` or `%subclass` block.'
);

const endHover = new Hover(endMarkdown);

// Init
const initMarkdown = new MarkdownString(
	'#### Logos Init\n```%init;\n```\n\n```\n%init([<ClassName>=<expr>, …]);\n```\n\n```%init(GroupName[, [+|-]<ClassName>=<expr>, …]);\n```\nInitialize a group\'s method and function hooks.\nPassing no group name will initialize the default group.\nPassing`ClassName=expr` arguments will substitute the given expressions for those classes at initialization time.\nThe`+` sigil(as in class methods in Objective - C) can be prepended to the classname to substitute an expression for the metaclass.\nIf not specified, the sigil defaults to`-`, to substitute the class itself.\nIf not specified, the metaclass is derived from the class.\nThe class name replacement is specially useful for classes that contain characters that can\'t be used as the class name token for the `%hook` directive, such as spaces and dots.\n\n**Example**:\n```\n%hook ClassName\n- (id)init {\n\treturn %orig;\n}\n%end\n\n%ctor {\n\t%init(ClassName=objc_getClass("SwiftApp.ClassName"));\n}\n```'
);

const init1Completion = new CompletionItem('init');
init1Completion.kind = CompletionItemKind.Operator;
init1Completion.detail = 'Init';
init1Completion.documentation = initMarkdown;

const init2Completion = new CompletionItem('init([...])');
init2Completion.kind = CompletionItemKind.Operator;
init2Completion.insertText = new SnippetString(
	'init([${1:ClassName}=${2:expr}, ${0:...}]);'
);
init2Completion.detail = 'Init (Arguments)';
init2Completion.documentation = initMarkdown;

const init3Completion = new CompletionItem('init([[+|-], ...])');
init3Completion.kind = CompletionItemKind.Operator;
init3Completion.insertText = new SnippetString(
	'init(${1:GroupName}[, [${2:+|-}]${3:ClassName}=${4:expr}, ${0:...}]);'
);
init3Completion.detail = 'Init (Arguments)';
init3Completion.documentation = initMarkdown;

const initHover = new Hover(initMarkdown);

// C
const cMarkdown = new MarkdownString(
	'#### Logos Class\n```\n%c([+|-]ClassName)\n```\nEvaluates to `ClassName` at runtime.\nIf the `+` sigil is specified, it evaluates to MetaClass instead of Class.\nIf not specified, the sigil defaults to `-`, evaluating to Class.'
);

const cCompletion = new CompletionItem('c()');
cCompletion.kind = CompletionItemKind.Operator;
cCompletion.insertText = new SnippetString('c(${1:ClassName})');
cCompletion.detail = 'Class';
cCompletion.documentation = cMarkdown;

const cHover = new Hover(cMarkdown);

// Orig
const origMarkdown = new MarkdownString(
	"#### Logos Orig\n```\n%orig\n```\n\n```\n%orig(args, …)\n```\nCall the original hooked function or method.\nDoesn't work in a `%new`'d method.\nWorks in subclasses, strangely enough, because MobileSubstrate will generate a super- call closure at hook time.\n(If the hooked method doesn't exist in the class we're hooking, it creates a stub that just calls the superclass implementation.) `args` is passed to the original function - don't include `self` and `_cmd`, Logos does this for you.\n\n**Example**:\n```\n%hook ClassName\n- (int)add:(int)a to:(int)b {\n\n\tif (a != 0) {\n\t\t// Return original result if `a` is not 0\n\t\treturn %orig;\n\t}\n\t// Otherwise, use 1 as `a`\n\treturn %orig(1, b);\n}\n%end\n```\n\n```\n\n&%orig\n```\nGet a pointer to the original function or method.\nReturn type is`void (*)(id, SEL[, arg types])`\n\n**Example**:\n```\n// Call from outside hooked method:\nvoid (*orig_ClassName_start)(id, SEL) = nil;\n\nvoid doStuff(id self, SEL _cmd) {\n\tif (self && orig_ClassName_start) {\n\t\torig_ClassName_start(self, _cmd);\n\t}\n}\n\n%hook ClassName\n- (void)start {\n\t%orig;\n\torig_ClassName_start = &%orig;\n\tdispatch_after(dispatch_time(DISPATCH_TIME_NOW, 1 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{\n\t\tdoStuff(self, _cmd);\n\t});\n}\n%end\n\n// Call with another object:\n%hook ClassName\n- (int)add:(int)a to:(int)b {\n\tint (*_orig)(id, SEL, int, int) = &%orig;\n\tClassName * myObject = [ClassName new];\n\tint r = _orig(myObject, _cmd, 1, 2);\n\t[myObject release];\n\treturn r;\n}\n%end\n```\n*Real world example at [PreferenceLoader](https://github.com/DHowett/preferenceloader/blob/master/prefs.xm#L237-L263)*"
);

const orig1Completion = new CompletionItem('orig');
orig1Completion.kind = CompletionItemKind.Operator;
orig1Completion.detail = 'Orig';
orig1Completion.documentation = origMarkdown;

const orig2Completion = new CompletionItem('orig()');
orig2Completion.kind = CompletionItemKind.Operator;
orig2Completion.insertText = new SnippetString('orig(${1:args...})');
orig2Completion.detail = 'Orig (Arguments)';
orig2Completion.documentation = origMarkdown;

const origHover = new Hover(origMarkdown);

// Log
const logMarkdown = new MarkdownString(
	'#### Logos Log\n```\n%log;\n```\n\n```n%log([(<type>)<expr>, …]);\n```\nDump the method arguments to syslog.\nTyped arguments included in `%log` will be logged as well.'
);

const log1Completion = new CompletionItem('log');
log1Completion.kind = CompletionItemKind.Operator;
log1Completion.detail = 'Log';
log1Completion.documentation = logMarkdown;

const log2Completion = new CompletionItem('log()');
log2Completion.kind = CompletionItemKind.Operator;
log2Completion.insertText = new SnippetString('log(${1:args...})');
log2Completion.detail = 'Log (Arguments)';
log2Completion.documentation = logMarkdown;

const logHover = new Hover(logMarkdown);

export function getCompletions() {
	return [
		ctorCompletion,
		dtorCompletion,
		groupCompletion,
		hookCompletion,
		new1Completion,
		new2Completion,
		subclassCompletion,
		propertyCompletion,
		init1Completion,
		init2Completion,
		init3Completion,
		cCompletion,
		orig1Completion,
		orig2Completion,
		log1Completion,
		log2Completion,
	];
}

export function getHover(type: string) {
	switch (type) {
		case 'ctor':
			return ctorHover;
		case 'dtor':
			return dtorHover;
		case 'group':
			return groupHover;
		case 'hook':
			return hookHover;
		case 'new':
			return newHover;
		case 'subclass':
			return subclassHover;
		case 'property':
			return propertyHover;
		case 'end':
			return endHover;
		case 'init':
			return initHover;
		case 'c':
			return cHover;
		case 'orig':
			return origHover;
		case 'log':
			return logHover;
		default:
			return undefined;
	}
}
