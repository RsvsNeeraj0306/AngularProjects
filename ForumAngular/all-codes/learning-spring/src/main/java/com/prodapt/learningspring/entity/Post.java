package com.prodapt.learningspring.entity;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Data
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String content;

	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "author_id", referencedColumnName = "id")
	private User author;

	@Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_date")
	private Date PostDate;

	public void setPostDate()
	{
		this.PostDate = new Date();
	}
}