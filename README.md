# AnywhrFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



#### Database tables
```
create table movie
(
	title varchar(256) not null
		constraint movie_pkey
			primary key,
	release_year varchar(128),
	fun_facts varchar(339),
	production_company varchar(256) default 'N/A'::character varying,
	distributor varchar(256),
	director varchar(79),
	writer varchar(49),
	actor_1 varchar,
	actor_2 varchar,
	actor_3 varchar
);
```


```
create table movie_location
(
	title varchar(45) not null,
	locations varchar(110)
);

```
