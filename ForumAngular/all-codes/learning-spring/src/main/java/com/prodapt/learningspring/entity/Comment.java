package com.prodapt.learningspring.entity;


import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Comment")
@Data
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;


    @ManyToOne
    @JoinColumn(name = "postId", referencedColumnName = "id")
    private Post post;

	private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_date")
	private Date PostDate;

	public void setPostDate()
	{
		this.PostDate = new Date();
	}

}